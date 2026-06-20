import React, { useState } from 'react';
import axios from 'axios';

const ReviewModal = ({ isOpen, onClose, lawyerId, lawyerName, onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`/api/reviews/${lawyerId}`, {
                rating,
                comment
            });

            onReviewSubmit(response.data);
            onClose();
            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-navy mb-4">Rate & Review</h2>
                <p className="text-slate mb-6">Share your experience with <span className="font-semibold text-navy">{lawyerName}</span></p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6 flex justify-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="text-4xl focus:outline-none transition-transform hover:scale-110"
                            >
                                <span className={star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'}>
                                    ★
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mb-6">
                        <label className="block text-navy font-semibold mb-2">Your Review</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                            rows="4"
                            placeholder="Tell us about your consultation..."
                            required
                        />
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-navy py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-navy text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
