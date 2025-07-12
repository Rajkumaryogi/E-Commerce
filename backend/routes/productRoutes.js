const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');
const  isAdminMiddleware = require('../middleware/isAdminMiddleware');
const { addProduct, updateProduct, deleteProduct,  } = require('../controllers/adminProductController');

//get all products
router.get('/', getAllProducts);

// Correct route with proper parameter name
router.get('/:productId', getProductById);

// admin routes to manage products like add, update, delete can be added here
router.post('/add/:productId', isAdminMiddleware.isAdmin, addProduct);
// Update product by ID
router.put('/update/:productId', isAdminMiddleware.isAdmin, updateProduct);
// Delete product by ID
router.delete('/delete/:productId', isAdminMiddleware.isAdmin, deleteProduct);


module.exports = router;