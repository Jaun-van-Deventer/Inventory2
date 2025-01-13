const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
app.use('/api/products', productRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const startEC2Instance = async () => {
  try {
    const response = await axios.post(process.env.EC2_START_API_URL);
    console.log('EC2 Instance started:', response.data);
  } catch (error) {
    console.error('Error starting EC2 Instance:', error);
  }
};

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await startEC2Instance(); // Start EC2 instance when server starts
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build')); 

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}