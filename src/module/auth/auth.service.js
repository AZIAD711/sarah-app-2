import {selectMany,selectOne} from "../../common/repo/select.js"
import {addManyRecords,addOneRecord} from "../../common/repo/add.js"
import UserModel from "../../model/user.model.js";
import {generateToken,loginCredentials} from "../../common/token/token.js"
// SIGN UP 
export const signupService = async (data)=>{
 const isExist = await selectOne({
    databaseType : "mongoDB",
    model : UserModel,
    whereClause:{
        email : data.email
    }
 })
 if (isExist){
    throw new Error("Email Is Already Exist !")
 }
 return await addOneRecord({
    databaseType : "mongoDB",
    model : UserModel,
    attributes : data
 })
}
// LOGIN
export const loginService = async (email,password)=>{
    const user = await selectOne({
    databaseType : "mongoDB",
    model : UserModel,
    whereClause:{
        email : email
    }
 })
 if (!user){
    throw new Error("Email Dosent't Exist !")
 }
const accessToken = generateToken({
    payload:{
        _id : user._id,
        role : user.role 
    },
    secretKey: process.env.ACCESS_SECERT_KEY,
    options:{
        expiresIn:"2h",
        audience:[],
        issuer:"sarah-app"
    }
})
const refreshToken = generateToken({
    payload:{
        _id : user._id,
        role : user.role 
    },
    secretKey: process.env.REFRESH_SECERT_KEY,
    options:{
        expiresIn:"7d",
        audience:[],
        issuer:"sarah-app"
    }
})
return {accessToken,refreshToken}
}