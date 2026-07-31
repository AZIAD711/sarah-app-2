
import {optionalAuthentication,authorization} from "../../common/middleware/optional-auth.middleware.js"
import express from "express"
import { UserRole } from "../../common/enum/user-role.js"
import { sendMessageController ,getMyMessagesController} from "./message.controller.js"
const messageRouter = express.Router()
messageRouter.post("/send/:reciverId",optionalAuthentication(),authorization(UserRole.USER),sendMessageController)
messageRouter.get("/get/me",optionalAuthentication(),authorization(UserRole.USER),getMyMessagesController)
export default messageRouter