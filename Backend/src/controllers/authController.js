const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { ApiError, asyncHandler } = require('../middleware/errorHandler');

// ----------------------------------------------------
// @desc    Generate JWT Token
// ----------------------------------------------------
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// ----------------------------------------------------
// @desc    Register a new user (Signup)
// @route   POST /api/auth/register
// @access  Public
// ----------------------------------------------------
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, skills, experienceLevel } = req.body;

  // Validation
  if (!name || !email || !password) {
    return next(new ApiError('Please provide name, email, and password', 400));
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ApiError('User with this email already exists', 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    skills,
    experienceLevel
  });

  if (!user) {
    return next(new ApiError('Invalid user data received', 400));
  }

  // Respond with token
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    }
  });
});

// ----------------------------------------------------
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// ----------------------------------------------------
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return next(new ApiError('Please provide an email and password', 400));
  }

  // Find user and explicitly select password to verify
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    return next(new ApiError('Invalid email or password', 401));
  }

  // Respond with token
  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    }
  });
});

// ----------------------------------------------------
// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
// ----------------------------------------------------
exports.getProfile = asyncHandler(async (req, res, next) => {
  // User is already attached to req object by 'protect' middleware
  res.status(200).json({
    success: true,
    data: req.user
  });
});
