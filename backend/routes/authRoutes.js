const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkNotAuthenticated } = require('../middleware/authMiddleware');

router.post('/register', checkNotAuthenticated, authController.register);
router.post('/login', checkNotAuthenticated, authController.login);
router.post('/logout', authController.logout);
router.get('/check-auth', authController.checkAuth);

module.exports = router;