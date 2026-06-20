const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

// Get all verified lawyers
router.get('/', async (req, res) => {
  try {
    const { specialization, minRating } = req.query;
    
    let query = { role: 'advocate', isVerified: true };
    
    if (specialization) {
      query.specialization = specialization;
    }
    
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    const lawyers = await User.find(query)
      .select('-password')
      .sort({ rating: -1, totalReviews: -1 });

    res.json(lawyers);
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    res.status(500).json({ error: 'Failed to fetch lawyers' });
  }
});

// Admin: get pending verification requests (must be before /:id route)
router.get('/admin/pending', auth, adminAuth, async (req, res) => {
  try {
    const pendingLawyers = await User.find({ role: 'advocate', isVerified: false })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(pendingLawyers);
  } catch (error) {
    console.error('Error fetching pending lawyers:', error);
    res.status(500).json({ error: 'Failed to fetch pending lawyers' });
  }
});

// Get lawyer by ID
router.get('/:id', async (req, res) => {
  try {
    const lawyer = await User.findOne({ _id: req.params.id, role: 'advocate' })
      .select('-password');

    if (!lawyer) {
      return res.status(404).json({ error: 'Lawyer not found' });
    }

    res.json(lawyer);
  } catch (error) {
    console.error('Error fetching lawyer:', error);
    res.status(500).json({ error: 'Failed to fetch lawyer' });
  }
});

// Verify lawyer (Admin only)
router.post('/verify/:id', auth, adminAuth, async (req, res) => {
  try {
    const lawyer = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'advocate' },
      { isVerified: true },
      { new: true }
    ).select('-password');

    if (!lawyer) {
      return res.status(404).json({ error: 'Lawyer not found' });
    }

    res.json({ message: 'Lawyer verified successfully', lawyer });
  } catch (error) {
    console.error('Error verifying lawyer:', error);
    res.status(500).json({ error: 'Failed to verify lawyer' });
  }
});

// Reject verification (Admin only)
router.post('/reject/:id', auth, adminAuth, async (req, res) => {
  try {
    const lawyer = await User.findOneAndDelete({
      _id: req.params.id,
      role: 'advocate',
      isVerified: false
    });

    if (!lawyer) {
      return res.status(404).json({ error: 'Lawyer not found' });
    }

    res.json({ message: 'Verification request rejected' });
  } catch (error) {
    console.error('Error rejecting lawyer:', error);
    res.status(500).json({ error: 'Failed to reject lawyer' });
  }
});

module.exports = router;
