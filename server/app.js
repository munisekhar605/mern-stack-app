const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transactionRoutes');

// Load environment variables from .env file
dotenv.config();

// Create the app
const app = express();

// Enable CORS for frontend to communicate with backend
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Database connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,   // These options are now ignored in MongoDB driver v4+
  useUnifiedTopology: true, // These options are now ignored in MongoDB driver v4+
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api', transactionRoutes);

// Listen on port from .env file or fallback to 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
