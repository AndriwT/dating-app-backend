const Message = require("../backend/models/Message")
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server = require('http').createServer(app);
const cors = require("cors");



require("dotenv").config();

//mongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Successfully connected to DB 🔌"))
  .catch(() => console.log("Couldn't connect to DB 🚫"));

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api", require("./routes/chatRoomRoute"));


//port listen
const port = process.env.PORT;
console.log(port);

server.listen(port, function() {
  console.log("listening on port 5000");
})

// ---------------------- SOCKET IO -------------------------------//


const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST'],
  }
});

io.on('connection', socket => {
  const chatroomId = socket.handshake.query.id
  socket.join(chatroomId)

  socket.on('message', (messageData) => {
    try {
      const mongoMessage = new Message(
        messageData
      )
      mongoMessage.save().then(() => {
        io.to(chatroomId).emit('message', {message: messageData.message})
      }).catch(error => console.log("Message couldn't be saved or emitted 1" + error))
    } catch (error) {
      console.log("Message couldn't be saved or emitted 2" + error)
    }

  })
  socket.on("disconnect", () => {
    console.log("Connection disconnected");
  })
})
// save the message in mongoDB straight from here


// const createMessage = async (req, res) => {
//   const message = await Message.create(req.body);
//   try {
//     return res.status(201).json(message);
//   } catch (error) {
//     return res.status(500).json({message: "Couldn't create the message"})
//   }
// }

// router.post("")

// SOCKET IO UNFINISHED........................................

//TODO: add all backend socket io logic to this file, 
//here you save the message to mongoDB and also send the message 
//to all the users inside the chatroom its supposed to go to