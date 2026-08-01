import express from "express"
import dotenv, { config } from "dotenv"
import { databaseConnection } from "./src/database/db-connection.js"
import userRouter from "./src/module/auth/auth.routing.js"
import messageRouter from "./src/module/message/message.routing.js"
import { redisConnection } from "./src/database/redis-connection.js"
import cor from "cor"
export const app = () => {
    const PORT = process.env.SERVER_PORT
    const whishList = [`http://localhost:${PORT}`, `http://localhost:6000`]
    var corsOptions = {
        origin: function (origin, callback) {
            if (whishList.includes(origin)) {
                callback(null, true)
            }
            else {
                callback(new Error("Not allowed by CORS"))
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
    dotenv.config();
    databaseConnection()
    redisConnection()
    const router = express()
    router.use("/uploads", express.static("uploads"))
    router.use(cor(corsOptions))
    router.use(express.json())
    router.use("/auth", userRouter)
    router.use("/message", messageRouter)
    return router
}
export default app