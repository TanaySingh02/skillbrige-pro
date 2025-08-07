// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: {
    personalInfo: String,
    education: String,
    experience: String,
    projects: String,
    skills: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);
 