const express = require('express');
const router = express.Router();
const { uploadResume, getMyResumes, getResumeById } = require('../controllers/resumeController');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/resume/upload
// @desc    Upload a new resume
// @access  Private
router.post('/upload', protect, upload.single('resume'), uploadResume);

// @route   GET /api/resume/my
// @desc    Get latest 4 resumes uploaded by user
// @access  Private
router.get('/my', protect, getMyResumes);


// @route   GET /api/resume/:id
// @desc    Get a specific resume by ID
// @access  Private
router.get('/:id', protect, getResumeById);


module.exports = router;
