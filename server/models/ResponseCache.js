const mongoose = require('mongoose');

const responseCache = new mongoose.Schema({
  // Normalized version of the user's question (lowercase, trimmed, no extra spaces)
  normalizedQuery: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  // The original question (for display/debugging)
  originalQuery: {
    type: String,
    required: true
  },
  // The cached AI response
  response: {
    type: String,
    required: true
  },
  // Extracted law references from the response
  relevantLaws: [{
    section: String,
    description: String
  }],
  // auto-delete after 30 days
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000  // 30 days TTL (in seconds)
  },
  // Track how many times this cached response was served
  hitCount: {
    type: Number,
    default: 0
  },
  // RAG: Sources used to generate the response (sections + verdicts)
  sources: [{
    type: mongoose.Schema.Types.Mixed
  }],
  // Whether this response was generated from verified database sources
  isFromDatabase: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('ResponseCache', responseCache);
