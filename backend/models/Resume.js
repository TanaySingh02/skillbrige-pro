const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },         // e.g., "Education"
  content: { type: String, required: true },       // raw text or markdown
  comments: [
    {
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  version: {
    type: Number,
    default: 1
  },
  title: { type: String, default: 'Untitled Resume' },
  sections: [sectionSchema],
  isPublic: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'reviewed'],
    default: 'draft'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
