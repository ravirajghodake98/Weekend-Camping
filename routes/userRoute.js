const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signUp', authController.signUp);
router.post('/signIn', authController.signIn);
router.get('/signOut', authController.signOut);

module.exports = router;