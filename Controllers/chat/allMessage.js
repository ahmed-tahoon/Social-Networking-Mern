const Message = require("../../Schema/Message");
const Chat = require('../../Schema/Chat')
const User = require('../../Schema/User')

const allMessage = async (req, res) => {
 try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name image email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }


};

module.exports = allMessage ;


