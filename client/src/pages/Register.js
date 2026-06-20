import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user'
  });

  // Advocate-specific fields
  const [advocateData, setAdvocateData] = useState({
    specialization: [],
    qualification: '',
    barCouncilId: '',
    barCouncilCertificate: '', // base64 string
    experience: '',
    consultationFee: '',
    bio: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  // OTP State
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [emailSentTo, setEmailSentTo] = useState('');
  const [fileReading, setFileReading] = useState(false);
  const [fileLoaded, setFileLoaded] = useState(false);

  const { register, verifyOTP } = useContext(AuthContext);
  const navigate = useNavigate();

  const specializations = ['Criminal', 'Civil', 'Corporate', 'Family', 'Tax', 'Property'];

  // Payment Guard: Check if payment was completed
  useEffect(() => {
    const storedPayment = localStorage.getItem('lawbook_payment');

    if (!storedPayment) {
      // No payment found, redirect to pricing page
      alert('Please select a plan first');
      navigate('/pricing');
      return;
    }

    try {
      const payment = JSON.parse(storedPayment);
      setPaymentData(payment);
      // If payment indicates a role (e.g., Advocate Pro), pre-select that role
      // Also pre-fill phone number captured during Razorpay checkout
      setFormData(prev => ({ ...prev, role: payment.role || 'user', phone: payment.phone || '' }));

    } catch (error) {
      console.error('Invalid payment data:', error);
      alert('Payment info is invalid, try again');
      localStorage.removeItem('lawbook_payment');
      navigate('/pricing');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdvocateChange = (e) => {
    const { name, value } = e.target;
    setAdvocateData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5MB');
        return;
      }
      setFileReading(true);
      setFileLoaded(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdvocateData(prev => ({ ...prev, barCouncilCertificate: reader.result }));
        setFileReading(false);
        setFileLoaded(true);
      };
      reader.onerror = () => {
        setError('Failed to read file. Please try again.');
        setFileReading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecializationToggle = (spec) => {
    setAdvocateData(prev => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...prev.specialization, spec]
    }));
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await verifyOTP(emailSentTo, otp);

    if (result.success) {
      // Clear payment data from localStorage after successful registration
      localStorage.removeItem('lawbook_payment');
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Common field validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.phone.trim()) {
      setError('All fields are mandatory. Please fill in Name, Email, Password and Phone.');
      return;
    }

    // Advocate-specific validation
    if (formData.role === 'advocate') {
      if (!advocateData.specialization.length) {
        setError('Please select at least one specialization.');
        return;
      }
      if (!advocateData.qualification.trim()) {
        setError('Qualification is mandatory.');
        return;
      }
      if (!advocateData.barCouncilId.trim()) {
        setError('Bar Council ID is mandatory.');
        return;
      }
      if (fileReading) {
        setError('Please wait for the certificate file to finish uploading.');
        return;
      }
      if (!advocateData.barCouncilCertificate) {
        setError('Please upload your Bar Council Certificate.');
        return;
      }
      if (!advocateData.experience && advocateData.experience !== 0) {
        setError('Experience is mandatory.');
        return;
      }
      if (!advocateData.consultationFee) {
        setError('Consultation Fee is mandatory.');
        return;
      }
      if (!advocateData.bio.trim()) {
        setError('Bio is mandatory.');
        return;
      }
    }

    setLoading(true);

    // Verify payment data exists
    if (!paymentData) {
      setError('Payment information missing. Please complete payment first.');
      setLoading(false);
      navigate('/pricing');
      return;
    }

    const userData = {
      ...formData,
      // Include payment verification data
      payment: {
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_signature: paymentData.razorpay_signature,
        planId: paymentData.planId,
        planName: paymentData.planName,
        amount: paymentData.amount
      }
    };

    if (formData.role === 'advocate') {
      userData.specialization = advocateData.specialization;
      userData.qualification = advocateData.qualification;
      userData.barCouncilId = advocateData.barCouncilId;
      userData.barCouncilCertificate = advocateData.barCouncilCertificate;
      userData.experience = parseInt(advocateData.experience) || 0;
      userData.consultationFee = parseInt(advocateData.consultationFee) || 0;
      userData.bio = advocateData.bio;
    }



    const result = await register(userData);

    if (result.success) {
      if (result.verificationRequired) {
        setShowOTP(true);
        setEmailSentTo(result.email);
        setLoading(false);
        return;
      }
      // Direct success (should not happen with updated flow but kept for safety)
      localStorage.removeItem('lawbook_payment');
      navigate('/dashboard');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-blue-900 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">⚖️</div>
          <h1 className="text-3xl font-bold text-navy mb-2">Join Lawbook</h1>
          <p className="text-slate">Create your account</p>
        </div>

        {/* Payment Success Info */}
        {paymentData && (
          <div className="bg-green-50 border border-green-200 px-4 py-3 rounded-lg mb-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-green-800 font-semibold">Payment Successful</p>
                <p className="text-green-700 text-sm">
                  {paymentData.planName} - ₹{paymentData.amount}
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Role Display */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg flex items-center justify-between border border-gray-200">
          <span className="text-slate font-semibold">Account Role:</span>
          <span className="bg-navy text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            {formData.role}
          </span>
        </div>

        <form onSubmit={showOTP ? handleOTPSubmit : handleSubmit} className="space-y-4">

          {showOTP ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                <p className="text-navy font-semibold">Verification Code Sent!</p>
                <p className="text-slate text-sm mt-1">
                  We've sent a 6-digit code to <span className="font-bold">{emailSentTo}</span>
                </p>
              </div>

              <div>
                <label className="block text-navy font-semibold mb-2">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-center text-2xl tracking-widest"
                  placeholder="123456"
                  maxLength="6"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-navy font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                    required
                  />
                </div>

                <div>
                  <label className="block text-navy font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-navy font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-navy font-semibold mb-2">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-10 text-gray-500 hover:text-gray-700 font-medium text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Advocate-specific fields */}
              {formData.role === 'advocate' && (
                <>
                  <div>
                    <label className="block text-navy font-semibold mb-2">Specialization</label>
                    <div className="grid grid-cols-2 gap-2">
                      {specializations.map(spec => (
                        <button
                          key={spec}
                          type="button"
                          onClick={() => handleSpecializationToggle(spec)}
                          className={`py-2 px-4 rounded-lg font-medium transition ${advocateData.specialization.includes(spec)
                            ? 'bg-navy text-white'
                            : 'bg-gray-100 text-slate hover:bg-gray-200'
                            }`}
                        >
                          {spec}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-navy font-semibold mb-2">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={advocateData.qualification}
                      onChange={handleAdvocateChange}
                      placeholder="e.g., LLB, LLM"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy font-semibold mb-2">Bar Council ID</label>
                      <input
                        type="text"
                        name="barCouncilId"
                        value={advocateData.barCouncilId}
                        onChange={handleAdvocateChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-navy font-semibold mb-2">Bar Council Certificate</label>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                      />
                      {fileReading && <p className="text-sm text-yellow-600 mt-1">⏳ Reading file...</p>}
                      {fileLoaded && <p className="text-sm text-green-600 mt-1">✅ Certificate loaded successfully</p>}
                    </div>

                    <div>
                      <label className="block text-navy font-semibold mb-2">Experience (years)</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        name="experience"
                        value={advocateData.experience}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setAdvocateData(prev => ({ ...prev, experience: val }));
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                        required
                        placeholder="e.g. 5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-navy font-semibold mb-2">Consultation Fee (₹)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="consultationFee"
                      value={advocateData.consultationFee}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setAdvocateData(prev => ({ ...prev, consultationFee: val }));
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                      required
                      placeholder="e.g. 2000"
                    />
                  </div>

                  <div>
                    <label className="block text-navy font-semibold mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={advocateData.bio}
                      onChange={handleAdvocateChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                      rows="3"
                      placeholder="Tell us about your expertise..."
                      required
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate">
            Already have an account?{' '}
            <Link to="/login" className="text-navy font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-slate hover:text-navy transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
