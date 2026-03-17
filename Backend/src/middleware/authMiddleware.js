const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ApiError, asyncHandler } = require('./errorHandler');

// ----------------------------------------------------
// @desc    Protect routes - Verify token & attach user
// ----------------------------------------------------
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract token from 'Bearer <token>'
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token found
  if (!token) {
    return next(new ApiError('Not authorized to access this route. No token provided.', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user by decoded ID, explicitly exclude password
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return next(new ApiError('User no longer exists', 401));
    }

    next();
  } catch (error) {
    // Distinct error message for expired tokens
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError('Session expired. Please log in again.', 401));
    }
    return next(new ApiError('Not authorized to access this route. Invalid token.', 401));
  }
});

module.exports = { protect };
