import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const AdminPanel = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [pendingLawyers, setPendingLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchPendingLawyers();
    }
  }, [user]);

  const fetchPendingLawyers = async () => {
    try {
      const response = await axios.get('/api/lawyers/admin/pending');
      setPendingLawyers(response.data);
    } catch (error) {
      console.error('Error fetching pending lawyers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (lawyerId) => {
    if (!window.confirm('Are you sure you want to verify this advocate?')) {
      return;
    }

    try {
      await axios.post(`/api/lawyers/verify/${lawyerId}`);
      alert('Advocate verified successfully!');
      fetchPendingLawyers();
    } catch (error) {
      console.error('Error verifying lawyer:', error);
      alert('Failed to verify advocate.');
    }
  };

  const handleReject = async (lawyerId) => {
    if (!window.confirm('Are you sure you want to reject this verification request?')) {
      return;
    }

    try {
      await axios.post(`/api/lawyers/reject/${lawyerId}`);
      alert('Verification request rejected.');
      fetchPendingLawyers();
    } catch (error) {
      console.error('Error rejecting lawyer:', error);
      alert('Failed to reject verification request.');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-slate">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-navy mb-2">Admin Panel</h1>
          <p className="text-slate">Manage advocate verification requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 max-w-sm gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-2">⏳</div>
            <h3 className="text-2xl font-bold text-navy">{pendingLawyers.length}</h3>
            <p className="text-slate">Pending Verifications</p>
          </div>
        </div>

        {/* Pending Lawyers */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-navy mb-6">Pending Verification Requests</h2>
          
          {pendingLawyers.length > 0 ? (
            <div className="space-y-6">
              {pendingLawyers.map(lawyer => (
                <div key={lawyer._id} className="border border-gray-200 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-navy mb-3">{lawyer.name}</h3>
                      
                      <div className="space-y-2">
                        <div className="flex">
                          <span className="text-slate w-32">Email:</span>
                          <span className="text-navy font-medium">{lawyer.email}</span>
                        </div>
                        <div className="flex">
                          <span className="text-slate w-32">Phone:</span>
                          <span className="text-navy font-medium">{lawyer.phone}</span>
                        </div>
                        <div className="flex">
                          <span className="text-slate w-32">Bar Council ID:</span>
                          <span className="text-navy font-medium">{lawyer.barCouncilId}</span>
                        </div>
                        <div className="flex">
                          <span className="text-slate w-32">Experience:</span>
                          <span className="text-navy font-medium">{lawyer.experience} years</span>
                        </div>
                        <div className="flex">
                          <span className="text-slate w-32">Specialization:</span>
                          <span className="text-navy font-medium">
                            {(lawyer.specialization || []).join(', ')}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="text-slate w-32">Qualification:</span>
                          <span className="text-navy font-medium">
                            {lawyer.qualification || 'N/A'}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="text-slate w-32">Fee:</span>
                          <span className="text-navy font-medium">₹{lawyer.consultationFee}</span>
                        </div>
                        {lawyer.barCouncilCertificate && (
                          <div className="flex">
                            <span className="text-slate w-32">Certificate:</span>
                            <a href={lawyer.barCouncilCertificate} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold underline">
                              View Document
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-navy mb-2">Bio:</h4>
                      <p className="text-slate mb-4">{lawyer.bio || 'No bio provided'}</p>
                      
                      <div className="text-sm text-slate mb-4">
                        Registered on: {new Date(lawyer.createdAt).toLocaleDateString()}
                      </div>

                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleVerify(lawyer._id)}
                          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                          ✓ Verify
                        </button>
                        <button
                          onClick={() => handleReject(lawyer._id)}
                          className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                          ✗ Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-navy mb-2">All caught up!</h3>
              <p className="text-slate">No pending verification requests</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
