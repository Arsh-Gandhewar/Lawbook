const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

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
      duration: duration || 30,
      type: type || 'video',
      notes,
      amount,
      meetingLink,
      status: 'pending'
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

    const appointments = await Appointment.find({ lawyerId: req.params.lawyerId })
      .populate('userId', 'name phone email')
      .sort({ scheduledDate: -1 });

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
