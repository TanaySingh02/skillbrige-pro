// exports.requestResumeReview = async (req, res) => {
//   try {
//     const resume = await Resume.findById(req.params.id);
//     if (!resume) return res.status(404).json({ message: 'Resume not found' });

//     if (resume.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     resume.status = 'In Review';
//     await resume.save();

//     res.status(200).json({ message: 'Review requested' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
