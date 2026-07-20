import express from "express"
import dotenv, { config } from "dotenv"
import {databaseConnection} from "./src/database/db-connection.js"
export const app =()=>{
    dotenv.config();
    databaseConnection()
    const router = express()
    router.use(express.json())
    return router
}
export default app