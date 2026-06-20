const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'advocate', 'admin'],
    default: 'user'
  },
  isGuest: {
    type: Boolean,
    default: false
  },
  // Advocate-specific fields
  specialization: {
    type: [String],
    enum: ['Criminal', 'Civil', 'Corporate', 'Family', 'Tax', 'Property'],
    default: []
  },
  qualification: {
    type: String,
    default: ''
  },
  barCouncilId: {
    type: String,
    sparse: true
  },
  barCouncilCertificate: {
    type: String,
    default: ''
  },
  experience: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  consultationFee: {
    type: Number,
    default: 0
  },

  // Detailed availability slots for advocates
  availabilitySlots: {
    type: [{
      dayOfWeek: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      startTime: String, // Format: "09:00"
      endTime: String,   // Format: "17:00"
      isAvailable: {
        type: Boolean,
        default: true
      }
    }],
    default: []
  },
  bio: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  // Email verification
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationOTP: {
    type: String
  },
  emailVerificationExpires: {
    type: Date
  },
  // Chat usage tracking with daily reset
  chatUsage: {

    // Daily renewal tracking
    daily: {
      date: {
        type: Date,
        default: () => new Date().setHours(0, 0, 0, 0) // Start of today
      },
      aiChatsUsed: {
        type: Number,
        default: 0
      },
      lawyerChatsUsed: {
        type: Number,
        default: 0
      }
    },
    // Daily limits based on plan (renewed every day)
    dailyLimits: {
      aiChatLimit: {
        type: Number,
        default: 10 // Default daily limit
      },
      lawyerChatLimit: {
        type: Number,
        default: 5
      }
    }
  },
  // Subscription fields
  subscription: {
    planId: {
      type: String,
      enum: ['basic', 'standard', 'premium'],
      default: 'basic'  // Default to basic plan
    },
    planName: {
      type: String,
      default: 'Basic Plan'  // Default plan name
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'active'
    },
    paymentId: {
      type: String,
      default: 'free_trial'  // Default for free users
    },
    orderId: {
      type: String,
      default: 'free_trial'  // Default for free users
    },
    amount: {
      type: Number,
      default: 0  // Free plan amount
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
