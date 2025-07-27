const Resume = require("../models/Resume");
const User = require("../models/User");
const Review = require("../models/Review");
const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");

// ✅ Upload resume and versioning
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

// ✅ Get latest 4 resumes of the user
exports.getMyResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(4);
  res.json(resumes);
});

// ✅ Get a resume by ID
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

// ✅ Request resume review (updated with correct status value)
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

  // Updated to use correct enum value from schema
  resume.status = "under_review";
  await resume.save();

  res.status(200).json({ message: "Resume sent for review", resume });
});

// ✅ Submit review request (uncommented and fixed)
exports.submitReviewRequest = asyncHandler(async (req, res) => {
  const { resumeId, resumeType } = req.body;

  const resume = await Resume.findById(resumeId);
  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  if (resume.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to submit this resume");
  }

  // Update status to submitted
  resume.status = "submitted";
  await resume.save();

  // Find a reviewer (random one for now)
  const reviewer = await User.findOne({ role: "reviewer" });
  if (!reviewer) {
    res.status(500);
    throw new Error("No reviewer available");
  }

  // Create Review entry
  await Review.create({
    resume: resume._id,
    reviewer: reviewer._id,
    status: "pending"
  });

  res.status(200).json({ message: "Review request submitted successfully" });
});

// ✅ Update resume status (with validation)
exports.updateResumeStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["draft", "submitted", "under_review", "reviewed"];

  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
  }

  const resume = await Resume.findById(req.params.id);
  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  // Allow both owner and reviewers to update status
  const isOwner = resume.user.toString() === req.user._id.toString();
  const isReviewer = req.user.role === "reviewer";

  if (!isOwner && !isReviewer) {
    res.status(403);
    throw new Error("Not authorized to update this resume");
  }

  resume.status = status;
  await resume.save();

  res.json({ message: "Resume status updated", resume });
});

// ✅ Delete resume
exports.deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  if (resume.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this resume");
  }

  const absolutePath = path.resolve(`.${resume.filePath}`);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }

  await resume.deleteOne();
  res.status(200).json({ message: "Resume deleted successfully" });
});

// ✅ Create built resume
exports.createBuiltResume = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const resumeData = {
    user: userId,
    type: "builder",
    data: req.body,
    version: 1,
    createdAt: new Date(),
  };

  const newResume = await Resume.create(resumeData);
  res.status(201).json(newResume);
});

// ✅ Save form resume
exports.saveFormResume = asyncHandler(async (req, res) => {
  const { data, title } = req.body;
  const userId = req.user._id;

  const newResume = await Resume.create({
    user: userId,
    type: "builder",
    data,
    title: title || "Untitled Resume"
  });

  res.status(201).json(newResume);
});