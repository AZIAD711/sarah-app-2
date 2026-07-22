import {selectMany,selectOne} from "../../common/repo/select.js"
import {addManyRecords,addOneRecord} from "../../common/repo/add.js"
import UserModel from "../../model/user.model.js";
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