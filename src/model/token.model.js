import { model, Schema, Types } from "mongoose";
import { MessageFlag } from "../common/enum/message-flag.js";
import { ref } from "node:process";
import { type } from "node:os";
// TOKEN SCHEMA
const tokenSchema = new Schema(
    {
        // USER ID 
        userId: {
            type: Types.ObjectId,
            trim: true,
            required: true,
            ref: "User"
        },
        // JTI 
        jti: {
            type: String,
            trim: true,
            required: true,
        },
        // EXPIRE IN
        expireIn: {
            type: Date,
            required: true,
        },
    },
    {
        strict: true,
        strictQuery: true,
        timestamps: true,
        collection: "token_data",
        versionKey: "version",
    }
);
tokenSchema.index("expireIn", { expireAfterSeconds: 0 })

const tokenModel = model("Token", tokenSchema);

export default tokenModel;