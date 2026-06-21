const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Review');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Create a review
router.post('/:lawyerId', auth, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { lawyerId } = req.params;
        const userId = req.user.userId;

        // Check if lawyer exists
        const lawyer = await User.findById(lawyerId);
        if (!lawyer || lawyer.role !== 'advocate') {
            return res.status(404).json({ message: 'Lawyer not found' });
        }

        // one review per lawyer per user
        const existingReview = await Review.findOne({ lawyerId, userId });
        if (existingReview) {
          return res.status(400).json({ message: 'You have already reviewed this lawyer' });
        }

        // Create review
        const review = await Review.create({
            lawyerId,
            userId,
            rating,
            comment
        });

        // Update lawyer stats
        // Update lawyer stats using MongoDB aggregation
        const stats = await Review.aggregate([
            { $match: { lawyerId: new mongoose.Types.ObjectId(lawyerId) } },
            { $group: { _id: '$lawyerId', averageRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } }
        ]);

        const totalReviews = stats.length > 0 ? stats[0].totalReviews : 0;
        const averageRating = stats.length > 0 ? stats[0].averageRating : 0;

        lawyer.rating = averageRating;
        lawyer.totalReviews = totalReviews;
        await lawyer.save();

        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get reviews for a lawyer
router.get('/:lawyerId', async (req, res) => {
    try {
        const reviews = await Review.find({ lawyerId: req.params.lawyerId })
            .populate('userId', 'name profileImage') // Populate reviewer details
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
