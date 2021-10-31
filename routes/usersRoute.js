const express = require('express');
const { auth } = require('../auth/auth');
const {
    registerController,
    getAllUserController,
    getUserByIdController,
    updateUserByIdController,
    deleteUserByIdController
} = require('../controllers/usersControllers');

const router = express.Router();

// Create user
router.post('/', registerController);

// Get all users
router.get('/', getAllUserController);

// Get user by id
router.get('/:id', getUserByIdController);

// Update user by id
router.put('/:id', updateUserByIdController);

// Delete user by id
router.delete('/:id', deleteUserByIdController);

module.exports = router;
