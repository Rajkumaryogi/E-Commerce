//This route file handles product-related requests in an e-commerce application.
const express = require('express');
const router = express.Router();

const { getAllProducts } = require('../controllers/productController');

// Routes for product management
router.get('/', getAllProducts); // Get all products


module.exports = router;
