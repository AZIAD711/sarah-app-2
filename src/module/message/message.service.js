import { selectMany, selectOne } from "../../common/repo/select.js"
import MessageModel from "../../model/message.model.js"

// SEND MESSAGE 
export const sendMessageService = async (data) => {
    return await MessageModel.create({
        body: data.message,
        senderId: data.senderId || undefined,
        reciverId: data.recieverId
    })
}
// GET MY MESSAGES 
export const getMyMessagesService = async(reciverId)=>{
    const messages = await selectOne({
        databaseType: "mongoDB",
        model: MessageModel,
        whereClause: {
            reciverId: reciverId
        }
    })
    if(!messages){
        throw new Error("USER NOT FOUND !")
    }
    return messages
}