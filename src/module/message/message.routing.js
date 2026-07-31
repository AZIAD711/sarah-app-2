import express from "express";
import {
    sendMessageController,
    getMyMessagesController,
    listAllMessagesController,
    deleteMessageController,
    deleteMessageByAdminController,
    replyMessageController
} from "./message.controller.js";

import {
    sendMessageSchema,
    replyMessageSchema,
    deleteMessageSchema
} from "./message.valdiate.js";

import { schemaValidate } from "../../common/middleware/valdiate.middelware.js";
import { authentication,authorization } from "../../common/middleware/auth.middleware.js";;
import { UserRole } from "../../common/enum/user-role.js";

const messageRouter = express.Router();

// Send Message
messageRouter.post(
    "/send/:reciverId",
    authentication(),
    authorization(UserRole.USER),
    schemaValidate(sendMessageSchema),
    sendMessageController
);

// Get My Messages
messageRouter.get(
    "/get/me",
    authentication(),
    authorization(UserRole.USER),
    getMyMessagesController
);

// List All Messages
messageRouter.get(
    "/list",
    authentication(),
    authorization(UserRole.ADMIN),
    listAllMessagesController
);

// Reply Message
messageRouter.post(
    "/reply/:messageId",
    authentication(),
    authorization(UserRole.USER),
    schemaValidate(replyMessageSchema),
    replyMessageController
);

// Delete My Message
messageRouter.delete(
    "/delete/:messageId",
    authentication(),
    authorization(UserRole.USER),
    schemaValidate(deleteMessageSchema),
    deleteMessageController
);

// Delete Any Message (Admin)
messageRouter.delete(
    "/kill/:messageId",
    authentication(),
    authorization(UserRole.ADMIN),
    schemaValidate(deleteMessageSchema),
    deleteMessageByAdminController
);

export default messageRouter;