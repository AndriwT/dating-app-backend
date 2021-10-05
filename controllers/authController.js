const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJwt } = require("../middlewares/processJwt");


const getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    if (users.length === 0) {
      return res.status(400).json({ message: "Couldn't find any users" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "No users found" });
  }
};

const signUpUser = async (req, res) => {
  const { email } = req.body;
  const testEmail = await User.findOne({ email }); // {email: req.body.email}
  if (testEmail) {
    return res
      .status(500)
      .json({ message: "The email entered is already in use" });
  }
  const user = await new User(req.body);
  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    // TODO: 
    // generate a token
    // also return token and user; LOOK at login method
    const token = await generateJwt(user._id);
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Not able to create user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(500).json({ message: "Wrong credentials entered" }); // user is not found
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(500).json({ message: "Please check credentials" });
  }
  const token = await generateJwt(user._id);
  return res.status(200).json({ user, token });
};

module.exports = {
  getAllUsers,
  signUpUser,
  loginUser,
};
