import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ReviewModal from '../components/ReviewModal';

const LawyerDiscovery = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selection States
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    scheduledDate: '',
    scheduledTime: '',
    type: 'video',
    notes: ''
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingAppointment, setPendingAppointment] = useState(null);

  // Chat State
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  // Review State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [lawyerToReview, setLawyerToReview] = useState(null);

  // Filter States
  const [filters, setFilters] = useState({
    specialization: [],
    rating: 0,
    priceMin: '',
    priceMax: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const specializations = ['Criminal', 'Civil', 'Corporate', 'Family', 'Tax', 'Property', 'Intellectual Property', 'Labor', 'Real Estate'];

  // Auth check
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Fetch lawyers
  useEffect(() => {
    fetchLawyers();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = lawyers;

    // Search
    if (searchQuery) {
      result = result.filter(lawyer =>
        lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lawyer.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Specialization
    if (filters.specialization.length > 0) {
      result = result.filter(lawyer =>
        lawyer.specialization.some(spec => filters.specialization.includes(spec))
      );
    }

    // Rating
    if (filters.rating > 0) {
      result = result.filter(lawyer => lawyer.rating >= filters.rating);
    }

    // Price
    if (filters.priceMin !== '') {
      result = result.filter(lawyer => lawyer.consultationFee >= Number(filters.priceMin));
    }
    if (filters.priceMax !== '') {
      result = result.filter(lawyer => lawyer.consultationFee <= Number(filters.priceMax));
    }

    setFilteredLawyers(result);
  }, [filters, searchQuery, lawyers]);

  const fetchLawyers = async () => {
    try {
      const response = await axios.get('/api/lawyers');
      setLawyers(response.data);
      setFilteredLawyers(response.data);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleSpecialization = (spec) => {
    setFilters(prev => {
      const current = prev.specialization;
      if (current.includes(spec)) {
        return { ...prev, specialization: current.filter(s => s !== spec) };
      } else {
        return { ...prev, specialization: [...current, spec] };
      }
    });
  };

  const handleReviewSubmit = () => {
    // Ideally refetch lawyer data to update rating, or update locally
    fetchLawyers();
    setShowReviewModal(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/lawyer-chat/lawyer/${selectedLawyer._id}`, {
        message: chatMessage
      });
      navigate(`/lawyer-chat/${response.data.chatId}`);
    } catch (error) {
      console.error('Error starting chat:', error);
      alert(error.response?.data?.message || 'Failed to start chat. Please try again.');
    }
  };

  const handleChatClick = (lawyer) => {
    setSelectedLawyer(lawyer);
    setShowChatModal(true);
  };

  // Booked slots state
  const [bookedSlots, setBookedSlots] = useState([]);
  const [bookingError, setBookingError] = useState('');

  const handleBookClick = (lawyer) => {
    setSelectedLawyer(lawyer);
    setBookingError('');
    setBookedSlots([]);
    setShowBookingModal(true);
  };

  // Fetch booked slots when user picks a date
  const handleDateChange = async (e) => {
    const date = e.target.value;
    setBookingData({ ...bookingData, scheduledDate: date, scheduledTime: '' });
    setBookingError('');
    setBookedSlots([]);

    if (date && selectedLawyer) {
      try {
        const response = await axios.get(`/api/appointments/slots/${selectedLawyer._id}?date=${date}`);
        setBookedSlots(response.data.bookedSlots || []);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    }
  };

  // Check if a chosen time conflicts with any booked slot
  const isTimeConflicting = (timeStr) => {
    if (!bookingData.scheduledDate || !timeStr || bookedSlots.length === 0) return false;

    const chosen = new Date(`${bookingData.scheduledDate}T${timeStr}`);
    const chosenEnd = new Date(chosen.getTime() + 30 * 60 * 1000); // 30-min window

    return bookedSlots.some(slot => {
      const slotStart = new Date(slot.start);
      const slotEnd = new Date(slot.end);
      // Overlap check: chosen_start < slot_end AND slot_start < chosen_end
      return chosen < slotEnd && slotStart < chosenEnd;
    });
  };

  // Format booked slots for display
  const getBookedTimesDisplay = () => {
    if (bookedSlots.length === 0) return null;
    return bookedSlots.map(slot => {
      const start = new Date(slot.start);
      const end = new Date(slot.end);
      const fmt = (d) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
      return `${fmt(start)} – ${fmt(end)}`;
    });
  };

  const getAvailabilityForDate = (dateString, lawyer) => {
    if (!dateString || !lawyer) return { start: '10:00', end: '18:00', available: true };
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return { start: '10:00', end: '18:00', available: true };
    
    const dayName = days[dateObj.getDay()];
    const slot = lawyer.availabilitySlots?.find(s => s.dayOfWeek === dayName);
    
    if (slot) {
      return { 
        start: slot.startTime || '10:00', 
        end: slot.endTime || '18:00', 
        available: slot.isAvailable 
      };
    }
    
    return { start: '10:00', end: '18:00', available: true };
  };

  const currentAvailability = getAvailabilityForDate(bookingData.scheduledDate, selectedLawyer);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');

    if (!currentAvailability.available) {
      setBookingError('The advocate is not available on this day.');
      return;
    }
    const t = bookingData.scheduledTime;
    if (t < currentAvailability.start || t > currentAvailability.end) {
      setBookingError(`Please select a time between ${currentAvailability.start} and ${currentAvailability.end}.`);
      return;
    }

    // Client-side conflict check
    if (isTimeConflicting(t)) {
      setBookingError('This time slot is already booked. Please choose a different time.');
      return;
    }

    try {
      const scheduledDateTime = new Date(`${bookingData.scheduledDate}T${bookingData.scheduledTime}`);
      setBookingData({ ...bookingData, scheduledDateTime }); // Save the combined time for later
      setShowBookingModal(false);
      setBookingError('');
      setShowPaymentModal(true);
    } catch (error) {
      console.error('Error in booking flow:', error);
      setBookingError('Failed to prepare appointment. Please try again.');
    }
  };

  const handlePayment = async () => {
    try {
      // load Razorpay if not already loaded
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => reject(new Error('Failed to load Razorpay'));
          document.body.appendChild(script);
        });
      }

      const orderResponse = await axios.post('/api/payments/create-order', {
        lawyerId: selectedLawyer._id
      });

      const options = {
        key: orderResponse.data.keyId,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: 'Lawbook',
        description: `Consultation with ${selectedLawyer.name}`,
        order_id: orderResponse.data.orderId,
        handler: async function (response) {
          try {
            await axios.post('/api/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              lawyerId: selectedLawyer._id,
              scheduledDate: bookingData.scheduledDateTime,
              type: bookingData.type,
              notes: bookingData.notes
            });
            alert('Payment successful! Your appointment is confirmed.');
            setShowPaymentModal(false);
            navigate('/dashboard');
          } catch (error) {
            console.error('Payment verification/booking failed:', error);
            alert(error.response?.data?.error || 'Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email
        },
        theme: {
          color: '#0f172a'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-slate">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-navy mb-2">Find an Advocate</h1>
          <p className="text-slate">Connect with verified legal professionals</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-navy text-lg">Filters</h3>
                <button
                  onClick={() => setFilters({ specialization: [], rating: 0, priceMin: '', priceMax: '' })}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search lawyers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                />
              </div>

              {/* Specialization */}
              <div className="mb-6">
                <h4 className="font-semibold text-navy mb-3">Specialization</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {specializations.map(spec => (
                    <label key={spec} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.specialization.includes(spec)}
                        onChange={() => toggleSpecialization(spec)}
                        className="rounded text-navy focus:ring-navy"
                      />
                      <span className="text-sm text-slate">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-semibold text-navy mb-3">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2].map(rating => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange('rating', rating)}
                        className="text-navy focus:ring-navy"
                      />
                      <span className="text-sm text-slate flex items-center">
                        {Array(rating).fill('★').join('')}
                        <span className="text-gray-300">
                          {Array(5 - rating).fill('★').join('')}
                        </span>
                        <span className="ml-1">& Up</span>
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === 0}
                      onChange={() => handleFilterChange('rating', 0)}
                      className="text-navy focus:ring-navy"
                    />
                    <span className="text-sm text-slate">Any Rating</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-navy mb-3">Consultation Fee (₹)</h4>
                <div className="flex space-x-2 items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <span className="text-slate">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-slate">Showing {filteredLawyers.length} advocates</p>
              {/* Could add sorting dropdown here later */}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredLawyers.map(lawyer => (
                <div key={lawyer._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition flex flex-col h-full">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3 overflow-hidden">
                      {lawyer.profileImage ? (
                        <img src={lawyer.profileImage} alt={lawyer.name} className="w-full h-full object-cover" />
                      ) : (
                        lawyer.name.charAt(0)
                      )}
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      <h3 className="text-xl font-bold text-navy">{lawyer.name}</h3>
                      {lawyer.isVerified && (
                        <span className="text-blue-500 text-lg" title="Verified">✓</span>
                      )}
                    </div>
                    <p className="text-slate text-sm mb-2 font-medium">
                      {lawyer.specialization.join(', ')}
                    </p>
                    <div className="flex items-center space-x-1 mb-2">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="font-bold text-navy">{lawyer.rating?.toFixed(1) || 'New'}</span>
                      <span className="text-slate text-sm">({lawyer.totalReviews} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                      <span className="text-slate">Experience</span>
                      <span className="font-semibold text-navy">{lawyer.experience} years</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                      <span className="text-slate">Fee</span>
                      <span className="font-bold text-green-700">₹{lawyer.consultationFee}</span>
                    </div>
                    {lawyer.bio && (
                      <p className="text-slate text-sm line-clamp-2 mt-2 italic">"{lawyer.bio}"</p>
                    )}
                  </div>

                  <div className="space-y-3 mt-auto">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleChatClick(lawyer)}
                        className="flex-1 bg-gradient-to-r from-navy to-blue-900 text-white py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition shadow-md"
                      >
                        Chat
                      </button>
                      {!user.isGuest && (
                        <button
                          onClick={() => handleBookClick(lawyer)}
                          className="flex-1 border-2 border-navy text-navy py-2 rounded-lg font-semibold text-sm hover:bg-navy hover:text-white transition"
                        >
                          Book
                        </button>
                      )}
                    </div>
                    {!user.isGuest && (
                      <button
                        onClick={() => {
                          setLawyerToReview(lawyer);
                          setShowReviewModal(true);
                        }}
                        className="w-full text-center text-xs text-slate hover:text-navy hover:underline mt-2"
                      >
                        Write a Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredLawyers.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow border border-gray-100">
                <div className="text-6xl mb-4 text-gray-300">🔍</div>
                <h3 className="text-2xl font-bold text-navy mb-2">No lawyers found</h3>
                <p className="text-slate">Try adjusting your filters to see more results</p>
                <button
                  onClick={() => setFilters({ specialization: [], rating: 0, priceMin: '', priceMax: '' })}
                  className="mt-4 text-blue-600 font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {
        showReviewModal && lawyerToReview && (
          <ReviewModal
            isOpen={showReviewModal}
            onClose={() => setShowReviewModal(false)}
            lawyerId={lawyerToReview._id}
            lawyerName={lawyerToReview.name}
            onReviewSubmit={handleReviewSubmit}
          />
        )
      }

      {/* Existing Booking Modal (Simplified for brevity, assumed same logic) */}
      {
        showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-navy mb-4">Book Consultation</h2>
              <div className="mb-6">
                <p className="text-slate">with <span className="font-semibold text-navy">{selectedLawyer?.name}</span></p>
                <p className="text-lg font-bold text-navy mt-2">₹{selectedLawyer?.consultationFee}</p>
              </div>

              {/* Booking Error */}
              {bookingError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-600 text-sm font-medium">⚠️ {bookingError}</p>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-navy font-semibold mb-2">Date</label>
                  <input
                    type="date"
                    value={bookingData.scheduledDate}
                    onChange={handleDateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-navy font-semibold mb-2">Time</label>
                  <input
                    type="time"
                    value={bookingData.scheduledTime}
                    onChange={(e) => {
                      setBookingData({ ...bookingData, scheduledTime: e.target.value });
                      setBookingError('');
                    }}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      bookingData.scheduledTime && isTimeConflicting(bookingData.scheduledTime)
                        ? 'border-red-400 bg-red-50'
                        : 'border-gray-300'
                    }`}
                    min={currentAvailability.start}
                    max={currentAvailability.end}
                    required
                    disabled={!currentAvailability.available}
                  />
                  {bookingData.scheduledDate && (
                    <p className={`text-xs mt-1 ${currentAvailability.available ? 'text-gray-500' : 'text-red-500'}`}>
                      {currentAvailability.available 
                        ? `Available from ${currentAvailability.start} to ${currentAvailability.end}` 
                        : 'Not available on this day'}
                    </p>
                  )}
                  {bookingData.scheduledTime && isTimeConflicting(bookingData.scheduledTime) && (
                    <p className="text-xs mt-1 text-red-500 font-medium">
                      ⚠️ This time overlaps with an existing booking
                    </p>
                  )}
                </div>

                {/* Show booked time windows */}
                {bookedSlots.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-800 text-xs font-semibold mb-1">🕐 Already booked slots on this date:</p>
                    <div className="flex flex-wrap gap-2">
                      {getBookedTimesDisplay()?.map((slot, i) => (
                        <span key={i} className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-navy font-semibold mb-2">Type</label>
                  <select
                    value={bookingData.type}
                    onChange={(e) => setBookingData({ ...bookingData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="video">Video Call</option>
                    <option value="chat">Chat</option>
                    <option value="document-review">Document Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-navy font-semibold mb-2">Notes</label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows="3"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => { setShowBookingModal(false); setBookingError(''); }}
                    className="flex-1 bg-gray-200 text-navy py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={bookingData.scheduledTime && isTimeConflicting(bookingData.scheduledTime)}
                    className={`flex-1 py-3 rounded-lg font-semibold ${
                      bookingData.scheduledTime && isTimeConflicting(bookingData.scheduledTime)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-navy text-white hover:bg-opacity-90'
                    }`}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {/* Existing Payment Modal */}
      {
        showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-navy mb-4">Complete Payment</h2>
              {/* Payment Details UI */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-navy">Total Amount:</span>
                  <span className="font-bold text-navy text-xl">₹{selectedLawyer?.consultationFee}</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => { setShowPaymentModal(false); setShowBookingModal(true); }} className="flex-1 bg-gray-200 text-navy py-3 rounded-lg">Back</button>
                <button onClick={handlePayment} className="flex-1 bg-navy text-white py-3 rounded-lg">Pay Now</button>
              </div>
            </div>
          </div>
        )
      }

      {/* Chat Modal */}
      {
        showChatModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-navy mb-4">Start Chat</h2>
              <div className="mb-6">
                <p className="text-slate">with <span className="font-semibold text-navy">{selectedLawyer?.name}</span></p>
                <p className="text-sm text-green-600 mt-2">
                  {user.isGuest ? '✓ Use one of your free daily chats' : '✓ Direct message to advocate'}
                </p>
              </div>
              <form onSubmit={handleChatSubmit}>
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                  rows="4"
                  placeholder="Message..."
                  required
                />
                <div className="flex space-x-4">
                  <button type="button" onClick={() => setShowChatModal(false)} className="flex-1 bg-gray-200 text-navy py-3 rounded-lg">Cancel</button>
                  <button type="submit" className="flex-1 bg-navy text-white py-3 rounded-lg">Start Chat</button>
                </div>
              </form>
            </div>
          </div>
        )
      }

    </div >
  );
};

export default LawyerDiscovery;
