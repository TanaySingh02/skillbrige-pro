const express = require('express');
const router = express.Router();
const { 
  uploadResume,
  getMyResumes,
  getResumeById,
  downloadResume,
  requestResumeReview,  // Using this one for consistency
  updateResumeStatus,
  deleteResume,
  createBuiltResume,
  saveFormResume,
  // Removed duplicate submitReviewRequest import
} = require('../controllers/resumeController');
const upload = require('../middleware/uploadMiddleware');
const { protect, reviewerOnly } = require('../middleware/authMiddleware');
const Resume = require("../models/Resume")

// File Upload Routes
router.post('/upload', protect, upload.single('resume'), uploadResume);

// Resume Access Routes
router.get('/my', protect, getMyResumes);
router.get('/:id', protect, getResumeById);
router.get('/download/:id', protect, downloadResume);

// Review Management Routes
router.post('/:id/request-review', protect, requestResumeReview);  // Primary review request endpoint
router.patch('/:id/status', protect, updateResumeStatus);

// Resume Modification Routes
router.delete('/:id', protect, deleteResume);
router.post('/builder', protect, createBuiltResume);
router.post('/form', protect, saveFormResume);

// Reviewer-Specific Routes
// Reviewer get all submitted resumes
router.get('/reviewer/resumes', protect, reviewerOnly, async (req, res) => {
  try {
    console.log("enter route")
    const resumes = await Resume.find({ status: 'under_review' })
      .populate('user', 'name email')
      .sort({ createdAt: -1 }); // Newest first
      console.log(resumes);
      
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.patch('/reviewer/:id/status', protect, reviewerOnly, updateResumeStatus);

module.exports = router;