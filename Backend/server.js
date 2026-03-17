const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Load environment variables BEFORE anything else
dotenv.config();

const app = require('./src/app');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

let server;

// Start the server and connect database sequentially
const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Start the server
  server = app.listen(PORT, () => {
    console.log(`\n🚀 HackMatch API Server`);
    console.log(`   Environment : ${NODE_ENV}`);
    console.log(`   Port        : ${PORT}`);
    console.log(`   URL         : http://localhost:${PORT}`);
    console.log(`   Health      : http://localhost:${PORT}/api/health\n`);
  });
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  // Close server & exit process
  if(server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});
