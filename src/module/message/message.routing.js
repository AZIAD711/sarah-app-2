
import {optionalAuthentication,authorization} from "../../common/middleware/optional-auth.middleware.js"
import express from "express"
import { UserRole } from "../../common/enum/user-role.js"
import { sendMessageController ,getMyMessagesController, listAllMessagesController, deleteMessageController, deleteMessageByAdminController, replyMessageController} from "./message.controller.js"
import { authentication } from "../../common/middleware/auth.middleware.js"
import { schemaValidate } from "../../common/middleware/valdiate.middelware.js"
import { sendMessageSchema,deleteMessageSchema,replyMessageSchema,updateMessageFlagSchema } from "./message.valdiate.js"
const messageRouter = express.Router()
messageRouter.post("/send/:reciverId",schemaValidate(sendMessageSchema),optionalAuthentication(),authorization(UserRole.USER),sendMessageController)
messageRouter.get("/get/me",optionalAuthentication(),authorization(UserRole.USER),getMyMessagesController)
messageRouter.get("/list",optionalAuthentication(),authorization(UserRole.ADMIN),listAllMessagesController)
messageRouter.post("/reply/:messageId",schemaValidate(replyMessageSchema),authentication(),authorization(UserRole.USER),replyMessageController)
messageRouter.delete("/delete/:messageId",optionalAuthentication(),authorization(UserRole.USER),deleteMessageController)
messageRouter.delete("/kill/:messageId",optionalAuthentication(),authorization(UserRole.ADMIN),deleteMessageByAdminController)
export default messageRouter