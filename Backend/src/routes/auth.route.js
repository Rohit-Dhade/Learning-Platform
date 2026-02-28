const express = require('express')
const authRouter = express.Router()
const {UserRegisterController,UserLoginController} = require('../Controllers/auth.controller')


authRouter.post('/login',UserLoginController)

authRouter.post('/register',UserRegisterController)

module.exports = authRouter;