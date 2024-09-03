// Import Express
const express = require("express");

// Assign Router from express
const router = express.Router();

const conversationController = require('../controllers/conversationController');
const checkauth = require('../middleware/checkauth')

router.post('/newConversation',checkauth.verifyToken, conversationController.newConversation)
router.get('/getConversation',checkauth.verifyToken, conversationController.getConversation)
router.get('/getFriendConversation/:id',checkauth.verifyToken, conversationController.getFriendConversation)


module.exports = router;