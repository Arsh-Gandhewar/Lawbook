const mongoose = require('mongoose');

const courtVerdictSchema = new mongoose.Schema({
  // Case name
  caseName: {
    type: String,
    required: true,
    index: true
    // e.g., "Kesavananda Bharati v. State of Kerala"
  },
  // Legal citation
  citation: {
    type: String,
    required: true
    // e.g., "(1973) 4 SCC 225"
  },
  // Which court delivered the judgment
  court: {
    type: String,
    required: true,
    enum: ['Supreme Court', 'High Court', 'Other'],
    index: true
  },
  // High Court name (if applicable)
  highCourtName: {
    type: String
    // e.g., "Delhi High Court", "Bombay High Court"
  },
  // Year of judgment
  year: {
    type: Number,
    required: true,
    index: true
  },
  // Bench / Judges
  judges: {
    type: [String],
    default: []
  },
  // Brief summary of the case
  summary: {
    type: String,
    required: true
  },
  // The core legal principle established
  legalPrinciple: {
    type: String,
    required: true
  },
  // The actual verdict / holding
  verdict: {
    type: String,
    required: true
  },
  // Why this case is important
  significance: {
    type: String,
    required: true
  },
  // Related section/article numbers (e.g., ["Article 21", "Section 302"])
  relatedSections: {
    type: [String],
    default: []
  },
  // Related Act names
  relatedActs: {
    type: [String],
    default: []
  },
  // Category of law
  category: {
    type: String,
    enum: ['Constitutional', 'Criminal', 'Civil', 'Family', 'Property', 'Consumer', 'Labour', 'Cyber', 'Environmental', 'Human Rights', 'Tax', 'Corporate', 'IP', 'Contract', 'Procedure', 'Security', 'Service', 'Other'],
    default: 'Other'
  },
  // Keywords for search
  keywords: {
    type: [String],
    default: []
  },
  // Fields for bulk-ingested SC judgments
  source: { type: String, default: '' },
  caseNo: { type: String, default: '' },
  cnr: { type: String, default: '' },
  inscCitation: { type: String, default: '' }
});

// Full-text search index
courtVerdictSchema.index({
  caseName: 'text',
  summary: 'text',
  legalPrinciple: 'text',
  verdict: 'text',
  keywords: 'text',
  relatedSections: 'text'
});

module.exports = mongoose.model('CourtVerdict', courtVerdictSchema);
