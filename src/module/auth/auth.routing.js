import {signupController,loginController} from "./auth.controller.js"
import express from "express"
const userRouter = express.Router()
userRouter.post("/signup",signupController)
userRouter.post("/login",loginController)
export default userRouter