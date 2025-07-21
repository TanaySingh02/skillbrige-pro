const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  generalFeedback: String,
  reviewedAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
