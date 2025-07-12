const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');
const  isAdminMiddleware = require('../middleware/isAdminMiddleware');
const { getAllAdminProducts ,addProduct, updateProduct, deleteProduct, updateProductVisibility,  } = require('../controllers/adminProductController');

//get all products
router.get('/', getAllProducts);


// getAllAdminProducts
router.get('/admin',isAdminMiddleware.isAdmin, getAllAdminProducts);

// admin routes to manage products like add, update, delete can be added here
router.post('/admin/add', isAdminMiddleware.isAdmin, addProduct);
// Update product by ID
router.put('/admin/update/:productId', isAdminMiddleware.isAdmin, updateProduct);
// Delete product by ID
router.delete('/admin/delete/:productId', isAdminMiddleware.isAdmin, deleteProduct);

// Admin routes patch to toggle product visibility
router.patch('/admin/:productId/visibility', isAdminMiddleware.isAdmin, updateProductVisibility);
// Correct route with proper parameter name
router.get("/:productId", getProductById);

module.exports = router;