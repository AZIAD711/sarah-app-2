import Joi from "joi";
import { MessageFlag } from "../../common/enum/message-flag.js";

const objectId = Joi.string()
    .hex()
    .length(24)
    .messages({
        "string.empty": "ID IS REQUIRED!",
        "string.hex": "INVALID OBJECT ID!",
        "string.length": "OBJECT ID MUST BE 24 CHARACTERS!"
    });

export const sendMessageSchema = {
    params: Joi.object({
        reciverId: objectId.required().messages({
            "any.required": "RECEIVER ID IS REQUIRED!"
        })
    }),

    body: Joi.object({
        message: Joi.string()
            .trim()
            .min(1)
            .max(1000)
            .required()
            .messages({
                "string.empty": "MESSAGE IS REQUIRED!",
                "string.min": "MESSAGE CANNOT BE EMPTY!",
                "string.max": "MESSAGE CANNOT EXCEED 1000 CHARACTERS!",
                "any.required": "MESSAGE IS REQUIRED!"
            })
    })
};

export const replyMessageSchema = {
    params: Joi.object({
        messageId: objectId.required().messages({
            "any.required": "MESSAGE ID IS REQUIRED!"
        })
    }),

    body: Joi.object({
        message: Joi.string()
            .trim()
            .min(1)
            .max(1000)
            .required()
            .messages({
                "string.empty": "REPLY IS REQUIRED!",
                "string.min": "REPLY CANNOT BE EMPTY!",
                "string.max": "REPLY CANNOT EXCEED 1000 CHARACTERS!",
                "any.required": "REPLY IS REQUIRED!"
            })
    })
};

export const deleteMessageSchema = {
    params: Joi.object({
        messageId: objectId.required().messages({
            "any.required": "MESSAGE ID IS REQUIRED!"
        })
    })
};

export const updateMessageFlagSchema = {
    params: Joi.object({
        messageId: objectId.required().messages({
            "any.required": "MESSAGE ID IS REQUIRED!"
        })
    }),

    body: Joi.object({
        flag: Joi.string()
            .valid(...Object.values(MessageFlag))
            .required()
            .messages({
                "any.only": `FLAG MUST BE ONE OF: ${Object.values(MessageFlag).join(", ")}!`,
                "any.required": "FLAG IS REQUIRED!",
                "string.empty": "FLAG IS REQUIRED!"
            })
    })
};