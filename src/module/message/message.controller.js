import { sendMessageService } from "./message.service.js"
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