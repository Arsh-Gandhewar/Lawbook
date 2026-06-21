const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Check lawyer's booked slots for a given date (public for booking UI)
router.get('/slots/:lawyerId', auth, async (req, res) => {
  try {
    const { date } = req.query; // expects YYYY-MM-DD
    if (!date) {
      return res.status(400).json({ error: 'Date query parameter is required (YYYY-MM-DD)' });
    }

    const dayStart = new Date(`${date}T00:00:00.000Z`);
    const dayEnd = new Date(`${date}T23:59:59.999Z`);

    // Find only paid (pending/confirmed) appointments for this lawyer on the given date
    const appointments = await Appointment.find({
      lawyerId: req.params.lawyerId,
      status: { $in: ['pending', 'confirmed'] },
      scheduledDate: { $gte: dayStart, $lte: dayEnd }
    }).select('scheduledDate duration');

    // Return the booked time windows so the frontend can block them
    const bookedSlots = appointments.map(apt => {
      const start = new Date(apt.scheduledDate);
      const end = new Date(start.getTime() + (apt.duration || 30) * 60 * 1000);
      return {
        start: start.toISOString(),
        end: end.toISOString()
      };
    });

    res.json({ bookedSlots });
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({ error: 'Failed to fetch booked slots' });
  }
});

// Book appointment
router.post('/', auth, async (req, res) => {
  try {
    const { lawyerId, scheduledDate, duration, type, notes } = req.body;
    const userId = req.user.userId;

    // Verify lawyer exists and is verified
    const lawyer = await User.findOne({ _id: lawyerId, role: 'advocate', isVerified: true });
    if (!lawyer) {
      return res.status(404).json({ error: 'Verified lawyer not found' });
    }

    // ── 30-minute conflict check ──
    // A meeting occupies a 30-minute window from its start time.
    // New booking is rejected if it overlaps with ANY existing non-cancelled
    // appointment for the same lawyer.
    const SLOT_DURATION = 30; // minutes
    const requestedStart = new Date(scheduledDate);
    const requestedEnd = new Date(requestedStart.getTime() + SLOT_DURATION * 60 * 1000);

    // Two time ranges [A_start, A_end) and [B_start, B_end) overlap when:
    //   A_start < B_end  AND  B_start < A_end
    const conflicting = await Appointment.findOne({
      lawyerId,
      status: { $in: ['pending', 'confirmed'] },
      $expr: {
        $and: [
          // existing appointment starts before new one ends
          { $lt: ['$scheduledDate', requestedEnd] },
          // existing appointment ends after new one starts
          {
            $lt: [
              requestedStart,
              {
                $add: [
                  '$scheduledDate',
                  { $multiply: [{ $ifNull: ['$duration', SLOT_DURATION] }, 60000] }
                ]
              }
            ]
          }
        ]
      }
    });

    if (conflicting) {
      const conflictStart = new Date(conflicting.scheduledDate);
      const conflictEnd = new Date(conflictStart.getTime() + (conflicting.duration || SLOT_DURATION) * 60 * 1000);
      return res.status(409).json({
        error: 'This time slot is not available. The advocate already has a meeting scheduled during this window.',
        conflictWindow: {
          start: conflictStart.toISOString(),
          end: conflictEnd.toISOString()
        }
      });
    }

    // Use server-side amount from lawyer's profile — NEVER trust client
    const amount = lawyer.consultationFee || 0;

    // Generate meeting link (for video consultations)
    const meetingLink = type === 'video' 
      ? `lawbook-meeting-${userId}-${lawyerId}-${Date.now()}`
      : '';

    const appointment = new Appointment({
      userId,
      lawyerId,
      scheduledDate,
      duration: duration || SLOT_DURATION,
      type: type || 'video',
      notes,
      amount,
      meetingLink,
      status: 'awaiting_payment'
    });

    await appointment.save();

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// Get user's appointments
router.get('/user/:userId', auth, async (req, res) => {
  try {
    if (req.params.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const appointments = await Appointment.find({ userId: req.params.userId })
      .populate('lawyerId', 'name specialization rating profileImage')
      .sort({ scheduledDate: -1 });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Get lawyer's appointments
router.get('/lawyer/:lawyerId', auth, async (req, res) => {
  try {
    if (req.params.lawyerId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Only show appointments that have been paid for (exclude awaiting_payment)
    const appointments = await Appointment.find({ 
      lawyerId: req.params.lawyerId,
      status: { $ne: 'awaiting_payment' }
    })
      .populate('userId', 'name phone email')
      .sort({ scheduledDate: -1 });

    // Also clean up stale unpaid appointments older than 30 minutes
    await Appointment.deleteMany({
      lawyerId: req.params.lawyerId,
      status: 'awaiting_payment',
      createdAt: { $lt: new Date(Date.now() - 30 * 60 * 1000) }
    });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching lawyer appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Update appointment status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // only the client or lawyer can update
    const isClient = appointment.userId.toString() === req.user.userId;
    const isLawyer = appointment.lawyerId.toString() === req.user.userId;
    if (!isClient && !isLawyer) {
      return res.status(403).json({ error: 'Access denied' });
    }

    appointment.status = status;
    await appointment.save();
    await appointment.populate('lawyerId', 'name specialization');

    res.json({ message: 'Appointment updated', appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// Get appointment by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('userId', 'name phone email')
      .populate('lawyerId', 'name specialization rating profileImage');

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const isClient = appointment.userId._id.toString() === req.user.userId;
    const isLawyer = appointment.lawyerId._id.toString() === req.user.userId;
    if (!isClient && !isLawyer) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
});

// Rate a completed appointment
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Only the client can rate the appointment
    if (appointment.userId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Only the client can rate the appointment' });
    }

    if (appointment.status !== 'completed') {
      return res.status(400).json({ error: 'Cannot rate an incomplete appointment' });
    }

    if (appointment.rating) {
      return res.status(400).json({ error: 'Appointment has already been rated' });
    }

    // Save rating on appointment
    appointment.rating = rating;
    await appointment.save();

    // Update lawyer's overall rating
    const lawyer = await User.findById(appointment.lawyerId);
    if (lawyer) {
      const currentTotalReviews = lawyer.totalReviews || 0;
      const currentAvgRating = lawyer.rating || 0;
      
      const newTotalReviews = currentTotalReviews + 1;
      const newAvgRating = ((currentAvgRating * currentTotalReviews) + rating) / newTotalReviews;
      
      lawyer.totalReviews = newTotalReviews;
      lawyer.rating = Number(newAvgRating.toFixed(1)); // Keep 1 decimal place
      await lawyer.save();
    }

    res.json({ message: 'Rating submitted successfully', appointment });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

module.exports = router;
