const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

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
app.use("/auth", require("./routes/auth"));


//port listen
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running ✨");
});
