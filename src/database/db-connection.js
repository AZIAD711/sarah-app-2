import mongoose from "mongoose"

export const databaseConnection = async()=>{
    const databaseUrl = process.env.DATABASE_URL
    try{
        await mongoose.connect(databaseUrl,{
            maxPoolSize:process.env.MAX_POOL,
            serverSelectionTimeoutMS:process.env.SERVER_TIMEOUT
        })
        console.log("✅ STATUS IN DATABASE MONGOOSE : PASSED ")
    }
    catch(errorDatabase){
        console.log("❌ ERROR IN DATABASE : ",errorDatabase)
    }
}