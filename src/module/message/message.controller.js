import { deleteMessageByAdminService, deleteMessageService, getMyMessagesService, listAllMessagesService, sendMessageService } from "./message.service.js"
import { createdDataResponse, dataDeletedResponse, dataFoundResponse, dataUpdatedResponse } from "../../common/response/sccuess.js"
import { internalServerResponse } from "../../common/response/error.js"
// SEND MESSAGE 
export const sendMessageController = async (request, response) => {
    try {
        const senderId = request.user._id
        const receiverId = request.params.reciverId;
        const message = request.body
        const messageData = await sendMessageService({
            message: request.body.message,
            senderId: request.user?._id,
            recieverId: request.params.reciverId
        });
        return createdDataResponse({
            response: response,
            message: "Message"
        })
    } catch (error) {
        console.log("❌ ERROR IN MESSAGE CONTROLLER : ", error)
        return internalServerResponse({
            response: response,
            message: error.message
        })
    }
}
// GET MY MESSAGES 
export const getMyMessagesController = async (request, response) => {
    try {
        const receiverId = request.user._id
        const messageData = await getMyMessagesService(receiverId);
        return dataFoundResponse({
            response: response,
            message: "Messages",
            data : messageData
        })
    } catch (error) {
        console.log("❌ ERROR IN MESSAGE CONTROLLER : ", error)
        return internalServerResponse({
            response: response,
            message: error.message
        })
    }
}
// LIST ALL MESSAGES 
export const listAllMessagesController = async (request, response) => {
    try {
        const messageData = await listAllMessagesService();
        return dataFoundResponse({
            response: response,
            message: "Messages",
            data : messageData
        })
    } catch (error) {
        console.log("❌ ERROR IN MESSAGE CONTROLLER : ", error)
        return internalServerResponse({
            response: response,
            message: error.message
        })
    }
}
// DELETE MESSAGE 
export const deleteMessageController = async (request, response) => {
    try {
        const messageId = request.params.messageId;
        const reciverId = request.user._id
        const messageData = await deleteMessageService({messageId : messageId , reciverId : reciverId});
        return dataDeletedResponse({
            response: response,
            message: "Message",
            data : messageData
        })
    } catch (error) {
        console.log("❌ ERROR IN MESSAGE CONTROLLER : ", error)
        return internalServerResponse({
            response: response,
            message: error.message
        })
    }
}
// DELETE MESSAGE BY ADMIN
export const deleteMessageByAdminController = async (request, response) => {
    try {
        const messageId = request.params.messageId;
        const messageData = await deleteMessageByAdminService({messageId : messageId});
        return dataDeletedResponse({
            response: response,
            message: "Message",
            data : messageData
        })
    } catch (error) {
        console.log("❌ ERROR IN MESSAGE CONTROLLER : ", error)
        return internalServerResponse({
            response: response,
            message: error.message
        })
    }
}