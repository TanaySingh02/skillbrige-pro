const Comment = require('../models/Comment');
const asyncHandler = require('express-async-handler');

// @desc    Add a comment to a resume section
// @route   POST /api/comments/:resumeId
// @access  Private
exports.addComment = asyncHandler(async (req, res) => {
  const { section, text } = req.body;

  if (!section || !text) {
    res.status(400);
    throw new Error('Section and text are required');
  }

  const comment = await Comment.create({
    resume: req.params.resumeId,
    reviewer: req.user._id,
    section,
    text,
  });

  res.status(201).json(comment);
});

// @desc    Get all comments for a resume
// @route   GET /api/comments/:resumeId
// @access  Private
exports.getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ resume: req.params.resumeId }).populate('reviewer', 'name email');
  res.json(comments);
});
// @desc    Delete a comment
// @route   DELETE /api/comments/:commentId 