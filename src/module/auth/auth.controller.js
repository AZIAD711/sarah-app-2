import {signupService,loginService,getProfileService,updateProfileService} from "./auth.service.js"
import {internalServerResponse} from "../../common/response/error.js"
import {createdDataResponse,dataDeletedResponse,dataFoundResponse,dataUpdatedResponse} from "../../common/response/sccuess.js"
import Joi from "joi"
// SIGN UP 
export const signupController = async (request,response)=>{
try {
    const data = request.body
const userData = await signupService(data)
return createdDataResponse({
    response : response,
    data : userData,
    message : "User"
})
} catch (error) {
    console.log("❌ ERROR IN SIGN UP CONTROLLER : ",error)
    return internalServerResponse({
        response : response ,
        message : error.message
    })
}
}
// LOGIN 
export const loginController = async (request,response)=>{
try {
const email = request.body.email
const password = request.body.password
const userData = await loginService(email,password)
return createdDataResponse({
    response : response,
    data : userData,
    message : "User"
})
} catch (error) {
    console.log("❌ ERROR IN LOGIN CONTROLLER : ",error)
    return internalServerResponse({
        response : response ,
        message : error.message
    })
}
}

// GET PROFILE 
export const getProfileController = async (request,response)=>{
try {
const userData = await getProfileService(request.user._id)
return dataFoundResponse({
    response : response,
    data : userData,
    message : "User"
})
} catch (error) {
    console.log("❌ ERROR IN GET PROFILE CONTROLLER : ",error)
    return internalServerResponse({
        response : response ,
        message : error.message
    })
}
}
// UPDATE PROFILE 
export const updateProfileController = async (request,response)=>{
try {
    const userId = request.user._id;
    const data = request.body
const userData = await updateProfileService(userId,data)
return dataUpdatedResponse({
    response : response,
    data : userData,
    message : "User"
})
} catch (error) {
    console.log("❌ ERROR IN UPDATE PROFILE CONTROLLER : ",error)
    return internalServerResponse({
        response : response ,
        message : error.message
    })
}
}