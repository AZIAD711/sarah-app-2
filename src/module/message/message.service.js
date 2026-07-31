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