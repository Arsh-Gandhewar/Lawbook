const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { sendVerificationEmail } = require('../utils/emailService');

// plan prices (in INR)
const PLAN_PRICES = {
  basic: 499,
  standard: 1499,
  premium: 2999
};



// Create Razorpay Order
router.post('/create-order', async (req, res) => {
  try {
    const { planId, planName } = req.body;

    if (!planId || !planName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // look up price from our config
    const amount = PLAN_PRICES[planId];
    if (!amount) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        planId,
        planName
      }
    };

    console.log('Creating Razorpay order with options:', options);

    // Use direct HTTPS call to Razorpay REST API to avoid SDK inconsistencies
    const https = require('https');
    const postData = new URLSearchParams({
      amount: String(options.amount),
      currency: options.currency,
      receipt: options.receipt
    }).toString();

    const basicAuth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');

    const reqOptions = {
      hostname: 'api.razorpay.com',
      port: 443,
      path: '/v1/orders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Basic ${basicAuth}`
      }
    };

    const order = await new Promise((resolve, reject) => {
      const r = https.request(reqOptions, (resp) => {
        let data = '';
        resp.on('data', chunk => data += chunk);
        resp.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (resp.statusCode >= 200 && resp.statusCode < 300) {
              resolve(parsed);
            } else {
              // Surface Razorpay error
              reject(new Error('Razorpay API error: ' + JSON.stringify(parsed)));
            }
          } catch (err) {
            reject(err);
          }
        });
      });
      r.on('error', err => reject(err));
      r.write(postData);
      r.end();
    });

    console.log('Razorpay REST response:', order);

    if (!order || !order.id) {
      console.error('Razorpay order creation failed:', order);
      return res.status(502).json({ error: 'Payment gateway error', details: order });
    }

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planId,
      planName,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Anonymous Free Trial (No Registration, No Payment)
router.post('/register-free', async (req, res) => {
  try {
    const { guestId } = req.body;

    // 1. Try to reuse existing guest session
    if (guestId) {
      const existingGuest = await User.findById(guestId);

      if (existingGuest && existingGuest.isGuest) {
        console.log(`Reusing existing guest account: ${guestId}`);

        // Generate new token for existing guest
        const token = jwt.sign(
          { userId: existingGuest._id, email: existingGuest.email, role: existingGuest.role, isGuest: true },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        return res.json({
          message: 'Welcome back! Continuing your guest session.',
          token,
          isGuest: true,
          user: {
            id: existingGuest._id,
            name: existingGuest.name,
            email: existingGuest.email,
            role: existingGuest.role,
            isGuest: true,
            chatUsage: {
              dailyLimits: existingGuest.chatUsage.dailyLimits,
              daily: {
                aiChatsUsed: existingGuest.chatUsage.daily.aiChatsUsed,
                lawyerChatsUsed: existingGuest.chatUsage.daily.lawyerChatsUsed
              }
            }
          }
        });
      }
    }

    // 2. Create new guest account if no valid existing one found
    const newGuestId = `guest_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const guestEmail = `${newGuestId}@lawbook.guest`;

    // Create anonymous user with free trial
    const user = new User({
      name: 'Guest User',
      email: guestEmail,
      password: await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10), // Random password
      phone: '0000000000',
      role: 'user',
      isGuest: true, // Explicitly set this
      isEmailVerified: true, // No verification needed for guest
      subscription: {
        planId: 'basic',
        planName: 'Free Trial',
        status: 'active',
        paymentId: 'free_trial',
        orderId: 'free_trial',
        amount: 0
      },
      chatUsage: {
        dailyLimits: {
          aiChatLimit: 10,
          lawyerChatLimit: 10
        }
      }
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role, isGuest: true },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Shorter expiry for guest accounts
    );

    res.status(201).json({
      message: 'Free trial started! You have 10 AI chats and 10 lawyer chats.',
      token,
      isGuest: true,
      user: {
        id: user._id,
        name: user.name,
        email: guestEmail,
        role: user.role,
        isGuest: true,
        chatUsage: {
          dailyLimits: {
            aiChatLimit: 10,
            lawyerChatLimit: 10
          },
          daily: {
            aiChatsUsed: 0,
            lawyerChatsUsed: 0
          }
        }
      }
    });
  } catch (error) {
    console.error('Anonymous free trial error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      emailVerificationOTP: otp,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.isEmailVerified = true;
    user.emailVerificationOTP = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Email verified successfully! Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Register with Payment Verification
router.post('/register', async (req, res) => {
  try {
    const {
      name, email, password, phone, role,
      specialization, qualification, barCouncilId, barCouncilCertificate, experience, consultationFee, bio,
      payment
    } = req.body;



    // Validate payment data
    if (!payment || !payment.razorpay_payment_id || !payment.razorpay_order_id || !payment.razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification required. Please complete payment first.' });
    }

    // test mode - skip verification in dev
    if (process.env.NODE_ENV !== 'production' && payment.testMode && payment.razorpay_signature === 'test_signature_skip_payment_mode') {
      console.log('Test mode - skipping payment verification');
    } else {
      // Verify Razorpay signature
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${payment.razorpay_order_id}|${payment.razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== payment.razorpay_signature) {
        return res.status(400).json({ error: 'Invalid payment signature. Payment verification failed.' });
      }

      console.log('Payment signature verified');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isEmailVerified) {
        return res.status(400).json({ error: 'Email already registered' });
      } else {
        // If unverified user exists, we can overwrite or update. Let's delete and re-create for simplicity
        await User.deleteOne({ email });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Calculate subscription end date (30 days from now)
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30);

    // Set chat limits based on subscription plan
    let monthlyLimit = 10; // Basic plan default
    if (payment.planId === 'standard') {
      monthlyLimit = 100; // Business Standard
    } else if (payment.planId === 'premium') {
      monthlyLimit = -1; // Unlimited for Advocate Pro
    }

    // Generate OTP (no longer used for email, but keeping variables to avoid breaking other code if needed)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Create user with subscription
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: (role === 'advocate') ? 'advocate' : 'user',
      isEmailVerified: true, // Render Free tier blocks SMTP, so we bypass verification
      emailVerificationOTP: undefined,
      emailVerificationExpires: undefined,
      subscription: {
        planId: payment.planId,
        planName: payment.planName,
        status: 'active',
        paymentId: payment.razorpay_payment_id,
        orderId: payment.razorpay_order_id,
        amount: payment.amount,
        startDate,
        endDate
      },
      chatUsage: {
        requestCount: 0,
        lastResetDate: startDate,
        monthlyLimit: monthlyLimit
      },
      ...(role === 'advocate' && {
        specialization,
        qualification,
        barCouncilId,
        barCouncilCertificate,
        experience,
        consultationFee,
        bio,
        isVerified: false
      })
    });

    await user.save();

    // Bypass sending email because Render Free tier blocks SMTP ports (465/587)
    // await sendVerificationEmail(email, name, otp);

    // Generate token for direct login
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful!',
      verificationRequired: false,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // check if email is verified
    if (!user.isGuest && !user.isEmailVerified) {
      return res.status(403).json({ error: 'Please verify your email before logging in.' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { 
      name, phone, bio, 
      specialization, qualification, barCouncilId, experience, consultationFee 
    } = req.body;

    const updateData = { name, phone, bio };

    if (req.user.role === 'advocate') {
      if (specialization) updateData.specialization = specialization;
      if (qualification !== undefined) updateData.qualification = qualification;
      if (barCouncilId !== undefined) updateData.barCouncilId = barCouncilId;
      if (experience !== undefined) updateData.experience = experience;
      if (consultationFee !== undefined) updateData.consultationFee = consultationFee;
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updateData },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Update advocate availability
router.put('/availability', auth, async (req, res) => {
  try {
    // only advocates can do this
    if (req.user.role !== 'advocate') {
      return res.status(403).json({ error: 'Only advocates can set availability' });
    }

    const { availabilitySlots } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { availabilitySlots },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Availability updated successfully',
      availabilitySlots: user.availabilitySlots
    });
  } catch (error) {
    console.error('Availability update error:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

// Get user profile
router.get('/user/:id', auth, async (req, res) => {
  try {
    if (req.params.id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

module.exports = router;
