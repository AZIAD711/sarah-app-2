import { client } from "../../database/redis-connection.js"
// OTP TEMPLATE 
export const otpTemplateWtihEmail=(email)=>{
    return `otp:${email}`
}
// SET FUNCTION 
export const setRecord = async (key, value, ttl) => {
    return ttl ? await client.set(key, JSON.stringify(value), { EX: ttl }) : await client.set(key, JSON.stringify(value))
}
// GET FUNCTION 
export const getRecord = async (key) => {
    return JSON.parse(await client.get(key))
}
// DELETE FUNCTION 
export const deleteRecord = async (key) => {
    return await client.del(key)
}
// EXSIT FUNCTION
export const exsitRecord = async (key) => {
    return await client.exists(key)
}
// FLUSHALL FUNCTION 
export const flushAllRecords = async () => {
    return await client.flushAll()
}
// MGET FUNCTION 
export const mGetRecords = async (keys) => {
    return client.mGet(keys)
}
