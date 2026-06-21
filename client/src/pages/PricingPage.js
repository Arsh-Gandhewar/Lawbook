import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PricingPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneForPayment, setPhoneForPayment] = useState('');
  const navigate = useNavigate();

  const plans = [
    {
      id: 'basic',
      name: 'Citizen Basic',
      price: 499,
      currency: 'INR',
      description: '5 consultations per month with email support',
      features: [
        'AI Legal Chatbot Access',
        'Basic Document Review',
        '5 Consultations/Month',
        'Email Support',
        'Legal Resource Library'
      ],
      badge: null,
      buttonText: 'Choose Plan',
      highlight: false
    },
    {
      id: 'standard',
      name: 'Business Standard',
      price: 1499,
      currency: 'INR',
      description: 'Unlimited consultations with video call support',
      features: [
        'Everything in Basic',
        'Priority AI Responses',
        'Unlimited Consultations',
        'Video Call Support',
        'Document Templates',
        'Priority Email & Chat Support',
        'Monthly Legal Updates'
      ],
      badge: 'Most Popular',
      buttonText: 'Choose Plan',
      highlight: true
    },
    {
      id: 'premium',
      name: 'Advocate Pro',
      price: 2999,
      currency: 'INR',
      description: 'Full platform access with client management tools',
      features: [
        'Everything in Standard',
        'Dedicated Account Manager',
        'Advanced AI Legal Research',
        'Client Management Dashboard',
        'Case Tracking System',
        'Professional Profile Listing',
        'Unlimited Video Consultations',
        '24/7 Priority Support',
        'Revenue Analytics'
      ],
      badge: null,
      buttonText: 'Choose Plan',
      highlight: false
    }
  ];

  const loadRazorpayScript = () => {
    if (window.Razorpay) return true;
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlanSelection = async (plan) => {
    // Ask for phone number before opening Razorpay
    const phone = phoneForPayment.trim();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit phone number before proceeding.');
      return;
    }

    setSelectedPlan(plan.id);
    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        setLoading(false);
        return;
      }

      // Create order on backend
      const { data } = await axios.post('/api/auth/create-order', {
        planId: plan.id,
        planName: plan.name,
        amount: plan.price
      });

      // Configure Razorpay options
      const options = {
        key: data.keyId || process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Lawbook',
        description: `${plan.name} Subscription`,
        order_id: data.orderId,
        handler: function (response) {
          // Payment successful

          
          // Store payment details in localStorage
          localStorage.setItem('lawbook_payment', JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            planId: plan.id,
            planName: plan.name,
            amount: plan.price,
            role: plan.id === 'premium' ? 'advocate' : 'user',
            phone: phone
          }));

          // Redirect to register page
          navigate('/register');
        },
        prefill: {
          name: '',
          email: '',
          contact: phone
        },
        method: {
          card: true,
          netbanking: true,
          wallet: true,
          upi: true
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: 'Pay using Net Banking',
                instruments: [
                  { method: 'netbanking' }
                ]
              },
              card: {
                name: 'Pay using Card',
                instruments: [
                  { method: 'card' }
                ]
              },
              upi: {
                name: 'Pay using UPI',
                instruments: [
                  { method: 'upi' }
                ]
              }
            },
            sequence: ['block.upi', 'block.card', 'block.banks'],
            preferences: {
              show_default_blocks: true
            }
          }
        },
        notes: {
          planId: plan.id,
          planName: plan.name
        },
        theme: {
          color: '#0f172a'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            setSelectedPlan(null);
          },
          escape: true,
          backdropclose: false
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);

    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Failed to initiate payment. Please try again.');
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Select the perfect subscription plan to access AI-powered legal guidance and connect with verified advocates
          </p>
          <div className="mt-4 text-sm text-slate-500">
            All plans include 7-day free trial • Cancel anytime
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="max-w-md mx-auto mb-10">
          <label className="block text-sm font-semibold text-slate-700 mb-2 text-center">
            📱 Enter your phone number to continue
          </label>
          <input
            type="tel"
            value={phoneForPayment}
            onChange={(e) => setPhoneForPayment(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="Enter 10-digit mobile number"
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            maxLength={10}
          />
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${
                plan.highlight ? 'ring-4 ring-blue-500 shadow-2xl' : ''
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1 rounded-bl-lg text-xs font-bold">
                  {plan.badge}
                </div>
              )}

              <div className="p-8 flex flex-col flex-grow">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                
                {/* Description */}
                <p className="text-slate-600 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-slate-900">
                      ₹{plan.price}
                    </span>
                    <span className="text-slate-600 ml-2">/month</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={`feature-${plan.id}-${index}`} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelection(plan)}
                  disabled={loading && selectedPlan !== plan.id}
                  className={`w-full mt-auto py-3 px-6 rounded-lg font-semibold transition-all duration-200 mb-3 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg text-white'
                      : 'bg-navy text-white hover:bg-opacity-90'
                  } ${
                    loading && selectedPlan === plan.id
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading && selectedPlan === plan.id ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    plan.buttonText
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 text-sm">
            Secure payment powered by Razorpay. Multiple payment methods supported.
          </p>
          <p className="text-slate-500 text-xs mt-2">
            By subscribing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
