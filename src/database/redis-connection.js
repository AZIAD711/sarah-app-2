import { createClient } from "redis"
import dotenv, { config } from "dotenv"
dotenv.config();
export const client = createClient({
  url: process.env.REDIS_URL
});

client.on("error", function (err) {
  throw err;
});

export const redisConnection = async () => {
  try {
    await client.connect()
    console.log("✅ REDIS CONNECTION SCCUESSFULLY !")
  } catch (error) {
    console.log(`❌ ERROR IN REDIS CONNECTION : `, error)
  }
}