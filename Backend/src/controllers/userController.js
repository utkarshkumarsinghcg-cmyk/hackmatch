const { asyncHandler } = require('../middleware/errorHandler');

// ----------------------------------------------------
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
// ----------------------------------------------------
const getUserProfile = asyncHandler(async (req, res, next) => {
  // req.user is attached by the protect middleware and excludes the password
  res.status(200).json({
    success: true,
    data: req.user
  });
});

module.exports = {
  getUserProfile
};
