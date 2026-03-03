const express = require("express");
const authRouter = express.Router();
const {
  UserRegisterController,
  UserLoginController,
  GetmeController,
  logoutController,
} = require("../Controllers/auth.controller");

const { identifyUser } = require("../middlewares/auth.middleware");

authRouter.post("/login", UserLoginController);

authRouter.post("/register", UserRegisterController);

authRouter.get("/get-me", identifyUser, GetmeController);

authRouter.get("/logout", identifyUser, logoutController);

module.exports = authRouter;
