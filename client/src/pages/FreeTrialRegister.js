import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const FreeTrialRegister = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { startFreeTrial } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleStartFreeTrial = async () => {
    setError('');
    setLoading(true);

    const result = await startFreeTrial();
    
    if (result.success) {
      // Redirect to chat immediately
      navigate('/chat');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-gold flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">

          <h2 className="text-4xl font-bold text-navy mb-4">Start Your Free Trial</h2>
          <p className="text-slate text-lg">
            Try 10 free chats, no account needed.
          </p>
        </div>

        {/* Benefits List */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-navy mb-4 text-xl text-center">What You Get Instantly:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3">–</span>
              <div>
                <h4 className="font-semibold text-navy">10 AI Legal Consultations</h4>
                <p className="text-sm text-slate">Ask Lawbook AI about any Indian law</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">–</span>
              <div>
                <h4 className="font-semibold text-navy">10 Lawyer Chats</h4>
                <p className="text-sm text-slate">Connect with verified advocates for free</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">–</span>
              <div>
                <h4 className="font-semibold text-navy">Instant Access</h4>
                <p className="text-sm text-slate">No forms, no waiting, no verification</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">–</span>
              <div>
                <h4 className="font-semibold text-navy">Upgrade Anytime</h4>
                <p className="text-sm text-slate">Create account later for unlimited access</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <button
          onClick={handleStartFreeTrial}
          disabled={loading}
          className="w-full bg-gradient-to-r from-navy to-blue-600 text-white py-4 rounded-lg font-bold text-xl hover:from-blue-700 hover:to-navy transition disabled:opacity-50 shadow-lg mb-6"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Starting Your Free Trial...
            </span>
          ) : (
            'Start Free Trial'
          )}
        </button>

        <div className="text-center space-y-3">
          <p className="text-slate text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-navy font-semibold hover:underline">
              Login
            </Link>
          </p>
          <p className="text-slate text-sm">
            Want to save your chats?{' '}
            <Link to="/pricing" className="text-gold font-semibold hover:underline">
              Create Full Account
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">

              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-yellow-800">Guest Mode</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Your free trial lasts 24 hours. To save your chat history and get unlimited access, 
                  create a full account anytime!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialRegister;
