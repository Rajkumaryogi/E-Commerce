const express = require('express');
const router = express.Router();
const {  loginAdminUser, logoutAdminUser } = require('../controllers/adminController');

// Admin routes
router.post('/login', loginAdminUser);
router.post('/logout', logoutAdminUser);

module.exports = router;