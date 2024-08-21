const Message = require('../models/Message');

exports.newMessage = async function (req, res) {
  const {conversationId,sender,text} = req.body
    const newMessage = new Message({conversationId,sender,text});

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
      } catch (err) {
        res.status(500).json(err);
      }
};

exports.getMessage = async function (req, res) {
    try {
        const messages = await Message.find({
          conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
      } catch (err) {
        res.status(500).json(err);
      }
};