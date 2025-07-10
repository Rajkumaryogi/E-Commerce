const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { checkAuthenticated } = require('../middleware/authMiddleware');

router.get('/', checkAuthenticated, orderController.getUserOrders);
router.post('/create', checkAuthenticated, orderController.createOrder);
router.get('/:orderId', checkAuthenticated, orderController.getOrderDetails);
router.post('/:orderId/pay', checkAuthenticated, orderController.processPayment);

module.exports = router;