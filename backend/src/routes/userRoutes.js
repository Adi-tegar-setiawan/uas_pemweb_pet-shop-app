const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// User Routes
router.get('/users', UserController.getUsers); // Get all users
router.get('/users/:id', UserController.getUser); // Get user by ID
router.post('/users', UserController.createUser); // Create user
router.put('/users/:id', UserController.updateUser); // Update user
router.delete('/users/:id', UserController.deleteUser); // Delete user

module.exports = router;
