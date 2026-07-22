import {signupService,loginService} from "./auth.service.js"
import {internalServerResponse} from "../../common/response/error.js"
import {createdDataResponse,dataDeletedResponse,dataFoundResponse,dataUpdatedResponse} from "../../common/response/sccuess.js"
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
    console.log("❌ ERROR IN SIGN UP CONTROLLER : ",error)
    return internalServerResponse({
        response : response ,
        message : error.message
    })
}
}