// const mongoose = require('mongoose');

// const formResumeSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   title: {
//     type: String,
//     default: 'Untitled Resume'
//   },
//   data: {
//     type: Object,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['draft', 'submitted', 'under_review', 'reviewed'],
//     default: 'draft'
//   },
//   averageRating: {
//     type: Number,
//     default: null
//   },
//   isPublic: {
//     type: Boolean,
//     default: false
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('FormResume', formResumeSchema);
