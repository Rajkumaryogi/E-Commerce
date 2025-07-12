const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');

//get all products
router.get('/', getAllProducts);

// Correct route with proper parameter name
router.get('/:productId', getProductById);


module.exports = router;