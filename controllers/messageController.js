const Message = require('../models/Message');
const User = require("../models/User");

exports.newMessage = async function (req, res) {

  try {

    const { SenderConversationId, ReceiverConversationId, sender, text } = req.body

    const newMessage = new Message({ SenderConversationId, ReceiverConversationId, sender, text });

    const getCurrentUser = await User.findOne({ username: req.user.username });

    const savedMessage = await newMessage.save();

    getCurrentUser.message.push(savedMessage);

    await getCurrentUser.save();

    const getFriend = await User.findById(req.body.receiverId);

    getFriend.message.push(newMessage)

    await getFriend.save()

    res.status(200).json(savedMessage);

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMessage = async function (req, res) {
  try {
    const messages = await Message.find({
      $or: [
        { SenderConversationId: req.params.conversationId },
        { ReceiverConversationId: req.params.conversationId }
      ]
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};