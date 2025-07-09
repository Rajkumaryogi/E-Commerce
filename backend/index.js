//creating a basic express server for E-commerce application for managing products, users, and orders, handling authentication, carts, and payments
const express = require('express');
const connectDB = require('./config/database');
const MongoStore = require('connect-mongo');
require("dotenv").config();


// Import routes
const productRoutes = require('./routes/productRoutes');

//Initializing the express application
const app = express();


// MongoDB connection
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));

// app.use(cors());
app.use(express.json());


// Custom request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} took ${duration}ms`);
  });
  next();
});

// Routes
app.use('/api/products', productRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});





// SERVER PORT
const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Export the app for testing purposes