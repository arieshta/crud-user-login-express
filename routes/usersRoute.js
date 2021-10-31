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
router.get('/', auth, getAllUserController);

// Get user by id
router.get('/:id', auth, getUserByIdController);

// Update user by id
router.put('/:id', auth, updateUserByIdController);

// Delete user by id
router.delete('/:id', auth, deleteUserByIdController);

module.exports = router;
