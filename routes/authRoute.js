const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  loginUser,
  signUpUser,
} = require("../controllers/authController");

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/signup", signUpUser);

router.post("/login", loginUser);

module.exports = router;
