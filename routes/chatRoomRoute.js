const express = require("express");
const router = express.Router();

const {
  getMessagesByChatroomId
} = require("../controllers/messageController");


router.post("/chatroom", getMessagesByChatroomId);

module.exports = router;
