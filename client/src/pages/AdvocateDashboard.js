import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const AdvocateDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalEarnings: 0
  });
  const [loading, setLoading] = useState(true);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [chats, setChats] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editProfileData, setEditProfileData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'advocate')) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch advocate's appointments
        const appointmentsRes = await axios.get(`/api/appointments/lawyer/${user?.id}`);
        const aptData = appointmentsRes.data || [];

        setAppointments(aptData.slice(0, 10));

        // Fetch incoming chats
        const chatsRes = await axios.get('/api/lawyer-chat/lawyer/incoming');
        setChats(chatsRes.data || []);

        // Calculate stats
        setStats({
          totalAppointments: aptData.length,
          pendingAppointments: aptData.filter(a => a.status === 'pending').length,
          completedAppointments: aptData.filter(a => a.status === 'completed').length,
          totalEarnings: aptData
            .filter(a => a.status === 'completed')
            .reduce((sum, a) => sum + (a.amount || 0), 0)
        });

        // Fetch availability slots and full profile
        const profileRes = await axios.get(`/api/auth/user/${user?.id}`);
        setProfileData(profileRes.data);
        setAvailabilitySlots(profileRes.data.availabilitySlots || []);
      } catch (error) {
        console.error('Error fetching advocate dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'advocate') {
      fetchData();
    }
  }, [user]);

  const updateAvailability = async (newSlots) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/auth/availability',
        { availabilitySlots: newSlots },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAvailabilitySlots(newSlots);
      setShowAvailabilityModal(false);
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const addAvailabilitySlot = () => {
    const newSlot = {
      dayOfWeek: 'Monday',
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: true
    };
    setAvailabilitySlots([...availabilitySlots, newSlot]);
  };

  const removeAvailabilitySlot = (index) => {
    setAvailabilitySlots(availabilitySlots.filter((_, i) => i !== index));
  };

  const updateAvailabilitySlot = (index, field, value) => {
    const updated = [...availabilitySlots];
    updated[index][field] = value;
    setAvailabilitySlots(updated);
  };

  const handleAppointmentAction = async (appointmentId, action) => {
    try {
      let statusToSet = 'cancelled';
      if (action === 'accept') statusToSet = 'confirmed';
      else if (action === 'complete') statusToSet = 'completed';

      await axios.patch(`/api/appointments/${appointmentId}/status`, {
        status: statusToSet
      });

      // Refresh appointments
      const appointmentsRes = await axios.get(`/api/appointments/lawyer/${user?.id}`);
      setAppointments(appointmentsRes.data.slice(0, 10));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const openEditProfileModal = () => {
    setEditProfileData(profileData || {});
    setShowEditProfileModal(true);
  };

  const handleEditProfileChange = (e) => {
    setEditProfileData({ ...editProfileData, [e.target.name]: e.target.value });
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('/api/auth/profile', editProfileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileData(res.data.user);
      setShowEditProfileModal(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };


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
        <div className="bg-navy text-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Adv. {user?.name}
              </h1>
              <p className="text-gray-200">
                {profileData?.specialization?.join(', ') || user?.specialization?.join(', ') || 'Legal Professional'}
              </p>
              {profileData && !profileData.isVerified && (
                <div className="mt-3 inline-block bg-yellow-500 text-navy px-4 py-2 rounded-lg font-semibold">
                  ⏳ Verification Pending - Admin approval required
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-xl font-bold">
                {user?.rating?.toFixed(1) || 'N/A'}
              </div>
              <div className="text-sm text-gray-200">
                ({user?.totalReviews || 0} reviews)
              </div>
            </div>
          </div>
        </div>



        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Chat Requests */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-navy mb-6">Recent Chat Requests</h2>

              {chats.length > 0 ? (
                <div className="space-y-4">
                  {chats.map(chat => (
                    <div
                      key={chat._id}
                      className="p-4 bg-gray-50 rounded-lg border-l-4 border-navy hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => navigate(`/lawyer-chat/${chat._id}`)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-navy text-lg">
                            {chat.userId?.name || 'Client'}
                          </h4>
                          <p className="text-sm text-slate truncate max-w-md">
                            {chat.title?.replace(`Chat with ${user?.name} - `, '') || 'Chat'}
                          </p>
                          <p className="text-xs text-slate mt-1">
                            {new Date(chat.updatedAt).toLocaleDateString()} at {new Date(chat.updatedAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <span className="bg-navy text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Open Chat
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-slate">No active chats</p>
                </div>
              )}
            </div>

            {/* Appointment Requests */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-navy mb-6">Appointment Requests</h2>

              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map(apt => (
                    <div
                      key={apt._id}
                      className="p-4 bg-gray-50 rounded-lg border-l-4 border-navy"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-navy text-lg">
                            {apt.userId?.name || 'Client'}
                          </h4>
                          <p className="text-sm text-slate">
                            📧 {apt.userId?.email}
                          </p>
                          <p className="text-sm text-slate">
                            📞 {apt.userId?.phone}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                'bg-red-100 text-red-700'
                          }`}>
                          {apt.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded mb-3">
                        <p className="text-sm text-navy font-semibold mb-1">Issue Description:</p>
                        <p className="text-sm text-slate">{apt.description || 'No description provided'}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate">
                          <p>📅 {new Date(apt.scheduledDate).toLocaleDateString()}</p>
                          <p>🕒 {new Date(apt.scheduledDate).toLocaleTimeString()}</p>
                          <p className="font-semibold text-navy mt-1">
                            💵 Fee: ₹{apt.amount || user?.consultationFee || 0}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {apt.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleAppointmentAction(apt._id, 'accept')}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleAppointmentAction(apt._id, 'reject')}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {apt.status === 'confirmed' && apt.type === 'video' && (
                            <div className="flex gap-2">
                              <Link
                                to={`/video/${apt._id}`}
                                className="bg-navy text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition"
                              >
                                Join Meeting
                              </Link>
                              <button
                                onClick={() => handleAppointmentAction(apt._id, 'complete')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition shadow"
                              >
                                Mark Complete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-slate text-lg">No appointment requests yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Profile & Quick Actions */}
          <div>
            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-navy mb-4">Your Profile</h2>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate font-semibold">Specialization</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(profileData?.specialization || user?.specialization || []).map(spec => (
                      <span key={spec} className="bg-navy text-white px-3 py-1 rounded-full text-xs">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-slate font-semibold">Qualification</p>
                  <p className="text-navy">{profileData?.qualification || 'N/A'}</p>
                </div>

                <div>
                  <p className="text-slate font-semibold">Bar Council ID</p>
                  <p className="text-navy">{profileData?.barCouncilId || user?.barCouncilId || 'N/A'}</p>
                </div>

                <div>
                  <p className="text-slate font-semibold">Experience</p>
                  <p className="text-navy">{profileData?.experience || user?.experience || 0} years</p>
                </div>

                <div>
                  <p className="text-slate font-semibold">Consultation Fee</p>
                  <p className="text-navy font-bold">₹{profileData?.consultationFee || user?.consultationFee || 0}</p>
                </div>

                {profileData?.barCouncilCertificate && (
                  <div>
                    <p className="text-slate font-semibold">Certificate</p>
                    <a href={profileData.barCouncilCertificate} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      View Certificate
                    </a>
                  </div>
                )}

                {(profileData?.bio || user?.bio) && (
                  <div>
                    <p className="text-slate font-semibold">Bio</p>
                    <p className="text-navy text-xs">{profileData?.bio || user?.bio}</p>
                  </div>
                )}
              </div>

              <button 
                onClick={openEditProfileModal}
                className="w-full mt-4 bg-navy text-white py-2 rounded-lg text-sm hover:bg-opacity-90 transition">
                Edit Profile
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-navy mb-4">Manage Availability</h2>

              <div className="space-y-3 mb-4">
                {availabilitySlots.length > 0 ? (
                  availabilitySlots.map((slot, index) => (
                    <div key={`${slot.dayOfWeek}-${slot.startTime}-${index}`} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold text-navy">{slot.dayOfWeek}</p>
                          <p className="text-xs text-slate">{slot.startTime} - {slot.endTime}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${slot.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                          {slot.isAvailable ? 'Available' : 'Busy'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate">No availability slots set</p>
                )}
              </div>

              <button
                onClick={() => setShowAvailabilityModal(true)}
                className="w-full bg-navy text-white py-2 rounded-lg text-sm hover:bg-opacity-90 transition"
              >
                Manage Availability
              </button>
            </div>


          </div>
        </div>
      </div>

      {/* Availability Management Modal */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-navy">Manage Availability</h2>
                <button
                  onClick={() => setShowAvailabilityModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {availabilitySlots.map((slot, index) => (
                  <div key={`edit-${slot.dayOfWeek}-${index}`} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                      <select
                        value={slot.dayOfWeek}
                        onChange={(e) => updateAvailabilitySlot(index, 'dayOfWeek', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      >
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>

                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => updateAvailabilitySlot(index, 'startTime', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      />

                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => updateAvailabilitySlot(index, 'endTime', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      />

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={slot.isAvailable}
                          onChange={(e) => updateAvailabilitySlot(index, 'isAvailable', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">Available</span>
                        <button
                          onClick={() => removeAvailabilitySlot(index)}
                          className="ml-auto bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={addAvailabilitySlot}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Add Slot
                </button>
                <button
                  onClick={() => updateAvailability(availabilitySlots)}
                  className="bg-navy text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                >
                  Save Availability
                </button>
                <button
                  onClick={() => setShowAvailabilityModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-navy">Edit Profile</h2>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editProfileData.name || ''}
                  onChange={handleEditProfileChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email (Cannot be changed)</label>
                <input
                  type="email"
                  value={editProfileData.email || ''}
                  className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editProfileData.phone || ''}
                  onChange={handleEditProfileChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={editProfileData.qualification || ''}
                  onChange={handleEditProfileChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience (Yrs)</label>
                  <input
                    type="number"
                    name="experience"
                    value={editProfileData.experience || ''}
                    onChange={handleEditProfileChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fee (₹)</label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={editProfileData.consultationFee || ''}
                    onChange={handleEditProfileChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={editProfileData.bio || ''}
                  onChange={handleEditProfileChange}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-navy text-white py-2 px-4 rounded-md hover:bg-opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvocateDashboard;
