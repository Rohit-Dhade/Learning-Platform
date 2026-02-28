const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "User name already exists"],
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
});

const UserModel = mongoose.model("UserModel" , UserSchema)

module.exports = UserModel;
