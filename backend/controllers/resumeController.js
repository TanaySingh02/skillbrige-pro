const Resume = require("../models/Resume");
const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs"); 
// const multer = require("multer");

// Upload resume and versioning
exports.uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const latestResume = await Resume.findOne({ user: req.user._id }).sort({
    version: -1,
  });

  const newResume = new Resume({
    user: req.user._id,
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
    title: req.file.originalname || "Untitled Resume", 
    version: latestResume ? latestResume.version + 1 : 1,
    isPublic: false,
  });

  const savedResume = await newResume.save();

  res.status(201).json({
    message: "Resume uploaded successfully",
    resume: savedResume,
  });
});

// Get latest 4 resumes of the user
exports.getMyResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(4);
  res.json(resumes);
});

// Get a resume by ID
exports.getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }
  res.json(resume);
});

// ✅ Download a resume file
exports.downloadResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }
  const filePath = path.resolve(`.${resume.filePath}`);
  res.download(filePath, resume.fileName);
});

// ✅ Request resume review (sets status to "In Review")
exports.requestResumeReview = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  if (resume.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this resume");
  }

  resume.status = "In Review";
  await resume.save();

  res.status(200).json({ message: "Resume sent for review", resume });
});
// ✅ Update resume status (for reviewers)
// @desc    Update resume status
// @route   PATCH /api/resume/:id/status
// @access  Private
exports.updateResumeStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  // Only owner can update status
  if (resume.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized to update this resume");
  }

  resume.status = status || "submitted";
  await resume.save();

  res.json({ message: "Resume status updated", resume });
});

//Delte a resume
// Controller function
exports.deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    res.status(404);
    throw new Error('Resume not found');
  }

  // Authorization check
  if (resume.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this resume');
  }

  // Delete file from file system
  if (fs.existsSync(resume.filePath)) {
    fs.unlinkSync(resume.filePath);
  }

  await resume.deleteOne();
  res.status(200).json({ message: 'Resume deleted successfully' });
});

// Create a built resume from the form data


exports.createBuiltResume = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const resumeData = {
    user: userId,
    type: 'builder', // distinguish between 'upload' and 'builder' types
    data: req.body,  // this will hold your structured form data
    version: 1,
    createdAt: new Date(),
  };

  const newResume = await Resume.create(resumeData);
  res.status(201).json(newResume);
});


//Saves built resume
exports.saveFormResume = async (req, res) => {
  try {
    const { data, title } = req.body;
    const userId = req.user._id;

    const newResume = await Resume.create({
      user: userId,
      type: 'builder',
      data,
      title: title || 'Untitled Resume'
    });

    res.status(201).json(newResume);
  } catch (err) {
    console.error('Error saving builder resume:', err);
    res.status(500).json({ error: 'Failed to save builder resume' });
  }
};