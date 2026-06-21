const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Appointment = require('../models/Appointment');
const { auth } = require('../middleware/auth');

// Initialize Razorpay only if keys are provided
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  console.log('Razorpay initialized');
} else {
  console.log('Razorpay keys not found - payment features disabled');
}

// Create order
router.post('/create-order', auth, async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ 
        error: 'Payment service not configured. Please add Razorpay keys to .env file.' 
      });
    }

    const { lawyerId } = req.body;

    if (!lawyerId) {
      return res.status(400).json({ error: 'Lawyer ID is required' });
    }

    // get lawyer and fee
    const User = require('../models/User');
    const lawyer = await User.findOne({ _id: lawyerId, role: 'advocate', isVerified: true });
    if (!lawyer) {
      return res.status(404).json({ error: 'Verified lawyer not found' });
    }

    const amount = lawyer.consultationFee || 0;

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        lawyerId
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify payment and create appointment
router.post('/verify', auth, async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      lawyerId,
      scheduledDate,
      duration,
      type,
      notes
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      const User = require('../models/User');
      const lawyer = await User.findOne({ _id: lawyerId, role: 'advocate', isVerified: true });
      if (!lawyer) {
        return res.status(404).json({ error: 'Verified lawyer not found' });
      }

      // ── 30-minute conflict check ──
      const SLOT_DURATION = 30; // minutes
      const requestedStart = new Date(scheduledDate);
      const requestedEnd = new Date(requestedStart.getTime() + SLOT_DURATION * 60 * 1000);

      const conflicting = await Appointment.findOne({
        lawyerId,
        status: { $nin: ['cancelled'] },
        $expr: {
          $and: [
            { $lt: ['$scheduledDate', requestedEnd] },
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
        // In a real app we'd initiate a refund here.
        return res.status(409).json({ 
          error: 'This time slot was just booked by someone else. Your payment was captured, please contact support for a refund.' 
        });
      }

      // Create appointment
      const userId = req.user.userId;
      const amount = lawyer.consultationFee || 0;
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
        status: 'pending', // Pending lawyer acceptance
        paymentId: razorpay_payment_id
      });

      await appointment.save();

      res.json({
        success: true,
        message: 'Payment verified and appointment booked successfully',
        appointment
      });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error verifying payment and booking:', error);
    res.status(500).json({ error: 'Failed to verify payment and book appointment' });
  }
});

module.exports = router;
