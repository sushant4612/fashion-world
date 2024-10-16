const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const flowerRoutes = require('./routes/flowerRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.error('Error connecting to MongoDB', err));

// Define routes
app.use('/api/flowers', flowerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Start the server
app.listen(5001, () => {
   console.log('Server running on port 5000');
});
