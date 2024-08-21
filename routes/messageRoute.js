// Import Express
const express = require("express");

// Assign Router from express
const router = express.Router();

const messageController = require('../controllers/messageController');
const checkauth = require('../middleware/checkauth')

router.post('/newMessage',checkauth.verifyToken, messageController.newMessage)
router.get('/getMessage/:conversationId',checkauth.verifyToken, messageController.getMessage)



module.exports = router;