// Shared pricing configuration — single source of truth
// Used by both frontend (Home.js, PricingPage.js) and backend (auth.js)

const PLANS = {
  basic: {
    id: 'basic',
    name: 'Citizen Basic',
    price: 499,
    monthlyLimit: 50,
    features: [
      '50 AI Legal Consultations/day',
      'Browse & Connect with Advocates',
      'Legal Document Templates',
      'Email Support'
    ]
  },
  standard: {
    id: 'standard',
    name: 'Business Standard',
    price: 1499,
    monthlyLimit: 100,
    features: [
      '100 AI Legal Consultations/day',
      'Priority Advocate Matching',
      'Advanced Legal Templates',
      'Video Consultations',
      'Priority Support'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Advocate Pro',
    price: 2999,
    monthlyLimit: 500,
    role: 'advocate',
    features: [
      '500 AI Legal Consultations/day',
      'Professional Dashboard',
      'Client Management Tools',
      'Priority Listing',
      'Analytics & Insights',
      'Dedicated Support'
    ]
  }
};

// For backend (Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PLANS };
}

// For frontend (React) 
export { PLANS };
export default PLANS;
