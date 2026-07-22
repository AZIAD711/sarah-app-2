import {signupController} from "./auth.controller.js"
import express from "express"
const userRouter = express.Router()
// http://localhost:4000/user/add
userRouter.post("/add",signupController)
export default userRouter