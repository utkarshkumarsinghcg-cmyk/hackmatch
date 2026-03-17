const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const healthRoutes = require('./routes/healthRoutes');

// Initialize Express app
const app = express();

// --------------- Global Middleware ---------------

// Enable CORS for all origins (will be restricted in production)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded payloads (form data)
app.use(express.urlencoded({ extended: true }));

// HTTP request logger (dev mode)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// --------------- API Routes ---------------

// Health check endpoint
app.use('/api', healthRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to HackMatch API 🚀',
    version: '1.0.0',
  });
});

// Future routes will be added here:
app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/teams', require('./routes/teamRoutes'));
app.use('/api/join-requests', require('./routes/joinRequestRoutes'));

// --------------- Error Handling ---------------

// Handle 404 - Route not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

module.exports = app;
