const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
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
module.exports = mongoose.model('Section',sectionSchema);
