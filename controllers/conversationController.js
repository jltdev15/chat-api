const Conversation = require('../models/Conversation')
const User = require("../models/User");

exports.newConversation = async function (req, res) {

  try {

    const getUserConversations = await Conversation.findById(req.body.ConversationId);

    if (!getUserConversations.conversations.find(conversation => conversation.members.includes(req.body.receiverId))) {

      getUserConversations.conversations.push({ members: [req.body.senderId, req.body.receiverId] });

      await getUserConversations.save();

      const getFriend = await User.findById(req.body.receiverId);

      const getFriendConversations = await Conversation.findById(getFriend.conversation)

      getFriendConversations.conversations.push({ members: [req.body.senderId, req.body.receiverId] })

      await getFriendConversations.save()

      const foundConversation = getUserConversations.conversations.find(conversation =>
        conversation.members.some(m => m === req.body.receiverId)
      );

      res.status(200).json(foundConversation);

    }
    else {
      console.log("conversation exist")
      res.status(500).json("conversation already exist");
    }

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConversation = async function (req, res) {
  try {
    const conversation = await User.findOne({ username: req.user.username })
      .populate("conversation")
      .exec();
    res.status(200).json(conversation.conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getFriendConversation = async function (req, res) {
  try {
    const conversation = await User.findOne({ _id: req.params.id })
      .populate("conversation")
      .exec();
    res.status(200).json(conversation.conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};