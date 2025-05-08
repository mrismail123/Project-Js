const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateInscription = require('../middlewares/validationMiddleware');

// Route POST /api/auth/inscription
router.post('/inscription', validateInscription, authController.inscription);

module.exports = router;
