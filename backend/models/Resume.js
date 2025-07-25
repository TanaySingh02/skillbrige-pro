const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    type: {
      type: String,
      enum: ['upload', 'builder'],
      default: 'upload'
    },

    // For uploaded resumes
    fileName: {
      type: String
      // Not required here, conditionally used based on type
    },
    filePath: {
      type: String
      // Not required here, conditionally used based on type
    },

    // For builder-based resumes
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },

    // Common metadata
    version: {
      type: Number,
      default: 1
    },

    title: {
      type: String,
      default: 'Untitled Resume'
    },

    isPublic: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'reviewed'],
      default: 'draft'
    },

    averageRating: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model('Resume', resumeSchema);
