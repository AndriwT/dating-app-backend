const { Schema, model } = require('mongoose');

const ChatRoomSchema = Schema(
  {
    date: {
      type: Date,
      required: true
    },
    users: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "User"
    },
  }
)

module.exports = model('ChatRoom', ChatRoomSchema);