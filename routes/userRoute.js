// Import Express
const express = require("express");

// Assign Router from express
const router = express.Router();

const authController = require('../controllers/authController');
const checkauth = require('../middleware/checkauth')
router.post('/login', authController.login)
router.post('/register', authController.registerAccount)
router.get('/user',checkauth.verifyToken, authController.getCurrentUser)
router.get('/allUser',checkauth.verifyToken, authController.getAlltUser)

module.exports = router;
