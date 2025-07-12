const express = require('express');
const router = express.Router();
const {  loginAdminUser, logoutAdminUser, verifyAdminUser, forgotPasswordAdminUser, resetPasswordAdminUser } = require('../controllers/adminController');

// Admin routes
router.post('/login', loginAdminUser);
router.post('/logout', logoutAdminUser);
//router for forgot password
router.post('/forgot-password', forgotPasswordAdminUser);
// after getting forgot-password link on email reset password route
router.post('/forgot-password/:token', resetPasswordAdminUser);

router.get('/verify', verifyAdminUser);

module.exports = router;