const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkAuthenticated } = require('../middleware/authMiddleware');

router.get('/:id', checkAuthenticated, userController.getUser);
router.put('/:id', checkAuthenticated, userController.updateUser);
router.delete('/:id', checkAuthenticated, userController.deleteUser);

module.exports = router;