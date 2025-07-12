const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Protect all routes
// router.use(authMiddleware.isAuthenticated);

// Current user routes
router.get('/me',authMiddleware.protect, userController.getMe);
router.patch('/updateMe',authMiddleware.protect, userController.updateMe);
router.delete('/deleteMe',authMiddleware.protect, userController.deleteMe);  // This is likely line 16

// Admin-only routes
// router.use(authMiddleware.restrictTo('admin'));


module.exports = router;