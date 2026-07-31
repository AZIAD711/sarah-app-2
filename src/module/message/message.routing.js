
import {optionalAuthentication,authorization} from "../../common/middleware/optional-auth.middleware.js"
import express from "express"
import { UserRole } from "../../common/enum/user-role.js"
import { sendMessageController ,getMyMessagesController, listAllMessagesController} from "./message.controller.js"
const messageRouter = express.Router()
messageRouter.post("/send/:reciverId",optionalAuthentication(),authorization(UserRole.USER),sendMessageController)
messageRouter.get("/get/me",optionalAuthentication(),authorization(UserRole.USER),getMyMessagesController)
messageRouter.get("/list",optionalAuthentication(),authorization(UserRole.ADMIN),listAllMessagesController)
export default messageRouter