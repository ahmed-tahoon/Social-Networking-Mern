const Message = require("../../Schema/Message");
const Chat = require('../../Schema/Chat')
const User = require('../../Schema/User')

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.body.id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name image");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name image email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = sendMessage ;


