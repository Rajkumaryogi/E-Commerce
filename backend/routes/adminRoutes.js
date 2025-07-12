const express = require('express');
const router = express.Router();
const {  loginAdminUser, logoutAdminUser, verifyAdminUser } = require('../controllers/adminController');

// Admin routes
router.post('/login', loginAdminUser);
router.post('/logout', logoutAdminUser);
router.get('/verify', verifyAdminUser);

module.exports = router;