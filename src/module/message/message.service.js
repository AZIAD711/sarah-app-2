import MessageModel from "../../model/message.model.js"

// SEND MESSAGE 
export const sendMessageService = async (data) => {
    return await MessageModel.create({
        body: data.message,
        senderId: data.senderId || undefined,
        reciverId: data.recieverId
    })
}