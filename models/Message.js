const { Schema, model } = require('mongoose');

const MessageSchema = Schema(
  {
    date: {
      type: Date,
      required: true
    },
    from: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "User"
    },
    to: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "User"
    },
    message: {
      type: String,
      required: true,
    },
    chatroom_id: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "ChatRoom"
    }
    
  }
)

module.exports = model('Message', MessageSchema);