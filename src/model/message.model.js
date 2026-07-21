import { model, Schema, Types } from "mongoose";
import { MessageFlag } from "../common/enum/message-flag.js";
import { ref } from "node:process";
import { type } from "node:os";
// MESSAGE SCHEMA
const messageSchema = new Schema(
  {
    // sender_id 
    senderId: {
      type: Types.ObjectId,
      trim: true,
      required: true,
      ref: "User"
    },
    // reciver id  
    reciverId: {
      type: Types.ObjectId,
      trim: true,
      required: true,
      ref: "User"
    },
    // BODY
    body: {
      type: String,
      trim: true,
      maxlength: 1000,
      required: true,
    },
    // parent_id 
    parentId: {
      type: Types.ObjectId,
      ref: "Message",
      default: null
    },
    // FLAG 
    flag: {
      type: String,
      enum: Object.values(MessageFlag),
      defualt: MessageFlag.SENT
    }
  },
  {
    strict: true,
    strictQuery: true,
    timestamps: true,
    collection: "message_data",
    versionKey: "version",
  }
);

const messageModel = model("Message", messageSchema);

export default messageModel;