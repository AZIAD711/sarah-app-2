import { selectMany, selectOne } from "../../common/repo/select.js"
import {deleteRecord} from "../../common/repo/delete.js"
import MessageModel from "../../model/message.model.js"
import { isObjectIdOrHexString, isValidObjectId, Types } from "mongoose"

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
// LIST ALL MESSAGES
export const listAllMessagesService = async()=>{
    return await MessageModel.find()
}
// DELETE MESSAGE 
export const deleteMessageService = async (data) => {
    const message = await deleteRecord({
        databaseType : "mongoDB",
        model : MessageModel,
        whereClause : {
        _id: data.messageId,
        reciverId: data.reciverId 
        }
    })
        if (!message) {
        throw new Error("MESSAGE NOT FOUND!");
    }

    return message;
};
// DELETE MESSAGE BY ADMIN 
export const deleteMessageByAdminService = async (messageId)=>{
        const message = await deleteRecord({
        databaseType : "mongoDB",
        model : MessageModel,
        whereClause : {
        _id: data.messageId,
        }
    })
    if (!message) {
        throw new Error("MESSAGE NOT FOUND!");
    }

    return message;
}
// REPLY MESSAGE 
export const replyMessageService = async({ messageId, senderId, content })=>{
    const message = await MessageModel.findById(messageId)
    if(!message){
        throw new Error("MESSAGE NOT FOUND !")
    }
    if(message.reciverId.toString() !== senderId.toString()){
        throw new Error("YOU DON'T HAVE ACCESS TO THIS MESSAGE !")
    }
    if(!senderId){
        throw new Error("CANNOT REPLY TO ANONYMOUS MESSAGE !")
    }
    const replyMessage= await MessageModel.create({
        body: content,
        senderId: senderId || undefined,
        reciverId: message.reciverId
    })
    return replyMessage
}