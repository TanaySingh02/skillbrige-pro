const Resume = require('../models/Resume');
const asyncHandler = require('express-async-handler');
const path = require('path');

// @desc    Upload resume and create new version
// @route   POST /api/resume/upload
// @access  Private
exports.uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const latestResume = await Resume.findOne({ user: req.user._id }).sort({ version: -1 });

  const newResume = new Resume({
    user: req.user._id,
    fileName: req.file.filename,
    filePath: req.file.path,
    version: latestResume ? latestResume.version + 1 : 1,
    isPublic: false, // default
  });

  const savedResume = await newResume.save();

  res.status(201).json({
    message: 'Resume uploaded successfully',
    resume: savedResume,
  });
});

// @desc    Get latest 4 resumes of the user
// @route   GET /api/resume/my
// @access  Private
exports.getMyResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(4);
  res.json(resumes);
});
exports.getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id).populate('user', 'name email');
  if (!resume) {
    res.status(404);
    throw new Error('Resume not found');
  }
  res.json(resume);
});

