import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import LawyerCard from '../components/LawyerCard';

const StarRating = ({ appointmentId, initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async (value) => {
    if (initialRating) return; // Already rated
    setIsSubmitting(true);
    try {
      await axios.post(`/api/appointments/${appointmentId}/rate`, { rating: value }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRating(value);
      if (onRate) onRate(appointmentId, value);
    } catch (err) {
      console.error(err);
      alert('Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center mt-2">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={!!initialRating || isSubmitting}
            className={`text-3xl leading-none focus:outline-none transition-all duration-300 transform ${
              star <= (hover || rating) 
                ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] scale-110' 
                : 'text-gray-300 scale-100'
            } ${
              !initialRating && !isSubmitting 
                ? 'hover:text-yellow-400 hover:scale-125 hover:-translate-y-1 active:scale-90 cursor-pointer' 
                : 'cursor-default'
            }`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !initialRating && setHover(star)}
            onMouseLeave={() => !initialRating && setHover(0)}
          >
            ★
          </button>
        ))}
      </div>
      <span className="text-xs text-slate ml-2 font-medium">
        {initialRating ? 'Thanks for rating!' : 'Rate your experience'}
      </span>
    </div>
  );
};

const UserDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [lawyers, setLawyers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [chats, setChats] = useState([]);
  const [totalChats, setTotalChats] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [lawyersRes, appointmentsRes, chatsRes] = await Promise.all([
          axios.get('/api/lawyers?limit=3', config),
          axios.get(`/api/appointments/user/${user?.id}`, config),
          axios.get(`/api/chat/history/${user?.id}`, config)
        ]);

        const chatData = chatsRes.data;
        const aptData = appointmentsRes.data;
        setTotalChats(chatData.length);
        setTotalAppointments(aptData.length);
        setLawyers(lawyersRes.data.slice(0, 3));
        setAppointments(aptData.slice(0, 10)); // Increased slice to see more past appointments
        setChats(chatData.slice(0, 15)); // Increased to populate both AI and Lawyer chat sections
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
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
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-navy mb-2">
            {user?.name || 'User'}
          </h1>
          <p className="text-slate">What would you like to do today?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/chat"
            className="bg-gradient-to-br from-navy to-blue-900 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group"
          >
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-xl font-bold mb-2">Start a New Chat</h3>
            <p className="text-gray-200 group-hover:text-white transition">
              Ask Lawbook AI your legal questions
            </p>
          </Link>

          <Link
            to="/lawyers"
            className="bg-white border-2 border-navy text-navy p-6 rounded-xl shadow-lg hover:shadow-xl transition group hover:bg-navy hover:text-white"
          >
            <div className="text-4xl mb-3">👨‍⚖️</div>
            <h3 className="text-xl font-bold mb-2">Find a Lawyer</h3>
            <p className="text-slate group-hover:text-gray-200 transition">
              Browse verified advocates
            </p>
          </Link>

          <div className="bg-white border border-gray-200 text-navy p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">Your Stats</h3>
            <div className="space-y-1 text-slate">
              <p>{totalChats} AI Conversations</p>
              <p>{totalAppointments} Appointments</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recommended Lawyers */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-navy">Recommended Lawyers</h2>
              <Link to="/lawyers" className="text-navy hover:underline text-sm">
                View All
              </Link>
            </div>

            {lawyers.length > 0 ? (
              <div className="space-y-4">
                {lawyers.map(lawyer => (
                  <LawyerCard key={lawyer._id} lawyer={lawyer} />
                ))}
              </div>
            ) : (
              <p className="text-slate text-center py-8">No lawyers available yet</p>
            )}
          </div>

          {/* Recent Activity */}
          <div>
            {/* AI Chats */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-navy">AI Conversations</h2>
                <Link to="/chat" className="text-navy hover:underline text-sm">
                  View All
                </Link>
              </div>

              {chats.filter(c => !c.isLawyerChat).length > 0 ? (
                <div className="space-y-3">
                  {chats.filter(c => !c.isLawyerChat).slice(0, 1).map(chat => (
                    <Link
                      key={chat._id}
                      to={`/chat/${chat._id}`}
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <h4 className="font-semibold text-navy mb-1">{chat.title}</h4>
                      <p className="text-sm text-slate">
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate text-center py-4">No AI chat history yet</p>
              )}
            </div>

            {/* Lawyer Chats */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-navy">Lawyer Consultations</h2>
                <Link to="/chat" className="text-navy hover:underline text-sm">
                  View All
                </Link>
              </div>

              {chats.filter(c => c.isLawyerChat).length > 0 ? (
                <div className="space-y-3">
                  {chats.filter(c => c.isLawyerChat).slice(0, 1).map(chat => (
                    <Link
                      key={chat._id}
                      to={`/lawyer-chat/${chat._id}`}
                      className="block p-4 bg-gray-50 rounded-lg border-l-4 border-navy hover:bg-gray-100 transition"
                    >
                      <h4 className="font-semibold text-navy mb-1">{chat.title}</h4>
                      <p className="text-sm text-slate">
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate text-center py-4">No lawyer chats yet</p>
              )}
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-navy mb-4">Upcoming Appointments</h2>

              {appointments.filter(apt => apt.status !== 'completed' && apt.status !== 'cancelled').length > 0 ? (
                <div className="space-y-3">
                  {appointments.filter(apt => apt.status !== 'completed' && apt.status !== 'cancelled').map(apt => (
                    <div
                      key={apt._id}
                      className="p-4 bg-gray-50 rounded-lg border-l-4 border-navy"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-navy">
                          {apt.lawyerId?.name}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                          }`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate mb-2">
                        {apt.lawyerId?.specialization?.join(', ')}
                      </p>
                      <p className="text-sm text-slate">
                        📅 {new Date(apt.scheduledDate).toLocaleString()}
                      </p>
                      {apt.status === 'confirmed' && apt.type === 'video' && (
                        <Link
                          to={`/video/${apt._id}`}
                          className="mt-3 inline-block bg-navy text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition"
                        >
                          Join Meeting
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate text-center py-4">No upcoming appointments</p>
              )}
            </div>

            {/* Past Appointments (Feedback & Rating) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-navy mb-4">Past Appointments</h2>

              {appointments.filter(apt => apt.status === 'completed').length > 0 ? (
                <div className="space-y-3">
                  {appointments.filter(apt => apt.status === 'completed').map(apt => (
                    <div
                      key={apt._id}
                      className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-700">
                          {apt.lawyerId?.name}
                        </h4>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-600">
                          Completed
                        </span>
                      </div>
                      <p className="text-sm text-slate mb-2">
                        📅 {new Date(apt.scheduledDate).toLocaleDateString()}
                      </p>
                      
                      <StarRating 
                        appointmentId={apt._id} 
                        initialRating={apt.rating}
                        onRate={(id, value) => {
                          setAppointments(prev => prev.map(a => a._id === id ? { ...a, rating: value } : a));
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate text-center py-4">No completed appointments to rate</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
