const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { checkAuthenticated } = require('../middleware/authMiddleware');

router.get('/', checkAuthenticated, cartController.getCart);
router.post('/add', checkAuthenticated, cartController.addToCart);
router.put('/update/:itemId', checkAuthenticated, cartController.updateCartItem);
router.delete('/remove/:itemId', checkAuthenticated, cartController.removeFromCart);
router.delete('/clear', checkAuthenticated, cartController.clearCart);

module.exports = router;