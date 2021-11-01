const express = require('express');
const { loginController } = require('../controllers/logInOutControllers');

const router = express.Router();

// Login user
router.post('/', loginController);

module.exports = router;
