const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// Add comment
router.post('/:resumeId', protect, addComment);

// Get all comments for a resume
router.get('/:resumeId', protect, getComments);

module.exports = router;
