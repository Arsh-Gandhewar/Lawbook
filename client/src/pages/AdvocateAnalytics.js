import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const AdvocateAnalytics = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalEarnings: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'advocate')) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsRes = await axios.get(`/api/appointments/lawyer/${user?.id}`);
        const aptData = appointmentsRes.data || [];

        setStats({
          totalAppointments: aptData.length,
          pendingAppointments: aptData.filter(a => a.status === 'pending').length,
          completedAppointments: aptData.filter(a => a.status === 'completed').length,
          totalEarnings: aptData
            .filter(a => a.status === 'completed')
            .reduce((sum, a) => sum + (a.amount || 0), 0)
        });
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'advocate') {
      fetchData();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-navy mb-2">Analytics Overview</h1>
          <p className="text-slate">Track your performance and earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="text-slate text-sm font-semibold uppercase tracking-wider">Total Appointments</div>
              <div className="text-3xl">📅</div>
            </div>
            <div className="text-4xl font-bold text-navy">{stats.totalAppointments}</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <div className="text-slate text-sm font-semibold uppercase tracking-wider">Pending Requests</div>
              <div className="text-3xl">⏰</div>
            </div>
            <div className="text-4xl font-bold text-yellow-600">{stats.pendingAppointments}</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="text-slate text-sm font-semibold uppercase tracking-wider">Completed</div>
              <div className="text-3xl">✅</div>
            </div>
            <div className="text-4xl font-bold text-green-600">{stats.completedAppointments}</div>
          </div>

          <div className="bg-gradient-to-br from-navy to-blue-900 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-300 text-sm font-semibold uppercase tracking-wider">Total Earnings</div>
              <div className="text-3xl">💰</div>
            </div>
            <div className="text-4xl font-bold">₹{stats.totalEarnings.toLocaleString()}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdvocateAnalytics;
