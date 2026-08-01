import express from "express"
import dotenv, { config } from "dotenv"
import { databaseConnection } from "./src/database/db-connection.js"
import userRouter from "./src/module/auth/auth.routing.js"
import messageRouter from "./src/module/message/message.routing.js"
import { redisConnection } from "./src/database/redis-connection.js"
import cors from "cors"
import { createRateLimiter } from "./src/common/middleware/rate-limiter.js"
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
        const Limiter = createRateLimiter({
        windowMs: 60 * 60 * 1000,
        max: 3,
        message: "Too many registration attempts."
    });
    dotenv.config();
    databaseConnection()
    redisConnection()
    const router = express()
    router.use("/uploads", express.static("uploads"))
    router.use(cors(corsOptions))
    router.use(express.json())
    router.use("/auth", Limiter, userRouter)
    router.use("/message",Limiter, messageRouter)
    return router
}
export default app