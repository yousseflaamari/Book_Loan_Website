const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/', userController.getAllUsers);

// Get a user by ID

// Create a new user

// Update a user

// Delete a user

module.exports = router;
