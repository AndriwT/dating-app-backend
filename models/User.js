const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { password, _id, __v, ...user } = this.toObject();
  user.uid = _id; // uid is only for display purposes, _id still exists on the backend
  return user;
};

module.exports = model("User", UserSchema);
