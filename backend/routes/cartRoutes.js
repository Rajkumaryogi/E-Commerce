const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');


router.get('/',authMiddleware.protect, getCart);
router.post('/addToCart',authMiddleware.protect, addToCart);
router.post('/removeFromCart',authMiddleware.protect, removeFromCart);

module.exports = router;