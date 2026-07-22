import express from "express"
import dotenv, { config } from "dotenv"
import {databaseConnection} from "./src/database/db-connection.js"
import userRouter from "./src/module/auth/auth.routing.js"
export const app =()=>{
    dotenv.config();
    databaseConnection()
    const router = express()
    router.use(express.json())
    router.use("/user",userRouter)
    return router
}
export default app