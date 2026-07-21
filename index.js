import dotenv from "dotenv";
dotenv.config();

import app from "./app.controller.js";

const PORT = process.env.SERVER_PORT ;

app().listen(PORT, () => {
    console.log("✅ STATUS IN SERVER : PASSED ")
    console.log(`✅ SERVER IS RUNNING ON PORT : ${PORT}`);
});