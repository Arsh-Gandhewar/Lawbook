const mongoose = require('mongoose');

const legalSectionSchema = new mongoose.Schema({
  // Which Act this section belongs to
  act: {
    type: String,
    required: true,
    index: true
    // e.g., "Indian Penal Code, 1860", "Bharatiya Nyaya Sanhita, 2023", "Constitution of India"
  },
  // Short code for the act
  actCode: {
    type: String,
    required: true,
    index: true
    // e.g., "IPC", "BNS", "COI", "CrPC", "BNSS"
  },
  // Section or Article number
  sectionNumber: {
    type: String,
    required: true,
    index: true
    // e.g., "302", "21", "41"
  },
  // Short title of the section
  title: {
    type: String,
    required: true
    // e.g., "Punishment for murder"
  },
  // The exact legal text of the provision
  legalText: {
    type: String,
    required: true
    // e.g., "Whoever commits murder shall be punished with death..."
  },
  // Simple explanation in layperson terms
  explanation: {
    type: String,
    required: true
  },
  // Punishment/penalty if applicable
  punishment: {
    type: String,
    default: ''
  },
  // Category of law
  category: {
    type: String,
    enum: ['Criminal', 'Civil', 'Constitutional', 'Family', 'Property', 'Consumer', 'Labour', 'Cyber', 'Other'],
    default: 'Other'
  },
  // Whether the offence is cognizable
  cognizable: {
    type: String,
    enum: ['Yes', 'No', 'N/A'],
    default: 'N/A'
  },
  // Whether the offence is bailable
  bailable: {
    type: String,
    enum: ['Yes', 'No', 'N/A'],
    default: 'N/A'
  },
  // Keywords for search matching
  keywords: {
    type: [String],
    default: []
  },
  // Cross-reference to BNS equivalent (for IPC sections)
  bnsEquivalent: {
    section: String,
    act: { type: String, default: 'Bharatiya Nyaya Sanhita, 2023' }
  },
  // Cross-reference to IPC equivalent (for BNS sections)
  ipcEquivalent: {
    section: String,
    act: { type: String, default: 'Indian Penal Code, 1860' }
  },
  // Whether this section has been repealed/replaced
  isRepealed: {
    type: Boolean,
    default: false
  },
  // Related sections for cross-referencing
  relatedSections: [{
    sectionNumber: String,
    actCode: String,
    title: String
  }]
});

// Create a text index for full-text search with weights
legalSectionSchema.index({
  keywords: 'text',
  title: 'text',
  legalText: 'text',
  explanation: 'text',
  sectionNumber: 'text',
  act: 'text'
}, {
  weights: {
    keywords: 10,
    title: 5,
    sectionNumber: 5,
    legalText: 1,
    explanation: 1
  }
});


// Compound index for direct lookups
legalSectionSchema.index({ actCode: 1, sectionNumber: 1 }, { unique: true });

module.exports = mongoose.model('LegalSection', legalSectionSchema);
