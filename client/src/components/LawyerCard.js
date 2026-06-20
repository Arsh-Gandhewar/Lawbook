import React from 'react';
import { Link } from 'react-router-dom';

const LawyerCard = ({ lawyer }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {lawyer.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-navy">{lawyer.name}</h3>
          <p className="text-slate text-sm mb-2">
            {lawyer.specialization.join(', ')}
          </p>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-semibold">{lawyer.rating.toFixed(1)}</span>
            <span className="text-slate text-sm">({lawyer.totalReviews} reviews)</span>
          </div>
          <p className="text-slate text-sm mb-3">{lawyer.experience} years experience</p>
          <div className="flex items-center justify-between">
            <span className="text-navy font-bold">₹{lawyer.consultationFee}/session</span>
            <Link
              to="/lawyers"
              className="bg-navy text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition text-sm"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
