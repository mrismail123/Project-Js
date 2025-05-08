const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route POST pour le login
router.post('/login', authController.login);

module.exports = router;