import {signupController,loginController,getProfileController} from "./auth.controller.js"
import {authentication,authorization} from "../../common/middleware/auth.middleware.js"
import express from "express"
import { UserRole } from "../../common/enum/user-role.js"
const userRouter = express.Router()
userRouter.post("/signup",signupController)
userRouter.post("/login",loginController)
userRouter.get("/profile",authentication(),authorization(UserRole.USER),getProfileController)
export default userRouter