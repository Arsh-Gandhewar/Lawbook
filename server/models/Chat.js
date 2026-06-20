const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isLawyerChat: {
    type: Boolean,
    default: false
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'model', 'lawyer'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    relevantLaws: [{
      section: String,
      description: String
    }],
    sources: [{
      type: { type: String },
      act: String,
      actCode: String,
      section: String,
      title: String,
      caseName: String,
      year: Number,
      court: String,
      citation: String
    }],
    isFromDatabase: {
      type: Boolean,
      default: false
    }
  }],
  title: {
    type: String,
    default: 'New Conversation'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', chatSchema);
