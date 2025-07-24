const mongoose = require('mongoose');
// const sectionSchema = require('./Section');


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
  // sections: [sectionSchema],
  isPublic: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'reviewed'],
    default: 'draft'
  },

  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  averageRating: {
    type: Number,
    default: null
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Resume', resumeSchema);
