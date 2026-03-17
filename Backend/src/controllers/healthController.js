// @desc    Health check - returns server status
// @route   GET /api/health
// @access  Public
const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    message: 'HackMatch API is running 🚀',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    environment: process.env.NODE_ENV || 'development',
  });
};

module.exports = { getHealth };
