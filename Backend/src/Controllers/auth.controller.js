const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function UserRegisterController(req, res) {
  const { name, role, password, email } = req.body;

  const isUserAlreadyExists = await UserModel.findOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User with this credentials already exists.",
      isUserAlreadyExists,
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const User = await UserModel.create({
    name,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    {
      id: User._id,
      name: User.name,
      role: User.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Account created successfully",
    user_info: {
      name: User.name,
      role: User.role,
      email: User.email,
    },
  });
}

async function UserLoginController(req, res) {
  const { email, name, role, password } = req.body;

  const isUserExists = await UserModel.findOne({
    $or: [{ name }, { email }],
  }).select("+password");

  if (!isUserExists) {
    return res.status(400).json({
      message: "User Doesn't exists with this credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExists.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Password is Invalid.",
    });
  }

  const token = jwt.sign(
    {
      id: isUserExists._id,
      name: isUserExists.name,
      role: isUserExists.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Logged in successfully",
    user_info: {
      name: isUserExists.name,
      role: isUserExists.role,
      email: isUserExists.email,
    },
  });
}

async function GetmeController(req, res) {
  const userId = req.user.id;

  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "User details fetched successfully",
    user,
  });
}

async function logoutController(req, res) {
  const token = req.cookies.token;
  res.clearCookie("token");

  // await redis.set(token , Date.now().toString()  , "EX" , 60*60);

  res.status(200).json({ message: "User logged out successfully" });
}

module.exports = {
  UserRegisterController,
  UserLoginController,
  GetmeController,
  logoutController,
};
