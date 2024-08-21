// Import Express
const express = require("express");

// Assign Router from express
const router = express.Router();

const conversationController = require('../controllers/conversationController');
const checkauth = require('../middleware/checkauth')

router.post('/newConversation',checkauth.verifyToken, conversationController.newConversation)
router.get('/getConversation/:userId',checkauth.verifyToken, conversationController.getConversation)


module.exports = router;