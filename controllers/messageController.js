const Message = require("../models/Message");

// const saveMessage = async (req, res) => {
//   const message = await Message.create(req.body);
//   try {
//     return res.status(201).json(message);
//   } catch (error) {
//     return res.status(500).json({ message: "Couldn't create the message" });
//   }
// };

const getMessagesByChatroomId = async (req, res) => {
  const { id } = req.body;
  const messages = await Message.find({chatroom_id: id});
  try {
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(400).json({ message: "Couldn't fetch messages" });
  }
};

module.exports = { getMessagesByChatroomId };
