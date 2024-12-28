const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authMiddleware, authController.protected);

// router.post('/google-login', authController.googleSignIn);


module.exports = router;
