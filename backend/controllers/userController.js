// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');

// // @desc    Register a new user
// // @route   POST /api/auth/register
// // @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, role } = req.body;

//   // Check if all fields are provided
//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error('Please provide name, email, and password');
//   }

//   // Check if user already exists
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   // Create user
//   const user = await User.create({
//     name,
//     email,
//     password,
//     role,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

// // @desc    Authenticate user & get token
// // @route   POST /api/auth/login
// // @access  Public
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   // Find user
//   const user = await User.findOne({ email });
//   if (user && (await user.comparePassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// });

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

// module.exports = {
//   registerUser,
//   loginUser,
// };
