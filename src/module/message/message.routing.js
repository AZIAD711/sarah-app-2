
import {optionalAuthentication,authorization} from "../../common/middleware/optional-auth.middleware.js"
import express from "express"
import { UserRole } from "../../common/enum/user-role.js"
import { sendMessageController ,getMyMessagesController, listAllMessagesController, deleteMessageController} from "./message.controller.js"
const messageRouter = express.Router()
messageRouter.post("/send/:reciverId",optionalAuthentication(),authorization(UserRole.USER),sendMessageController)
messageRouter.get("/get/me",optionalAuthentication(),authorization(UserRole.USER),getMyMessagesController)
messageRouter.get("/list",optionalAuthentication(),authorization(UserRole.ADMIN),listAllMessagesController)
messageRouter.delete("/delete/:messageId",optionalAuthentication(),authorization(UserRole.USER),deleteMessageController)
export default messageRouter