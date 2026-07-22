import { request, response } from "express"
import { decodeToken } from "../token/token.js"
import { authorizedResponse, invalidTokenResponse} from "../response/error.js"
// AUTHENCATION MIDDELWARE FUNCTION 
export const authentication = () => {
    return (request, response, next) => {
        const authrozied = request.headers.authorization
        if(!authrozied){
            return invalidTokenResponse({
                response
            })
        }
        const token = request.headers.authorization.split(" ")[1]
        const decoded = decodeToken(token)
        request.user = decoded
        next()
    }
}
// AUTHORIZATION MIDDELWARE FUNCTION
export const authorization = (...roles) => {
    return (request, response, next) => {
        if (roles.includes(request.user.role)) {
            return next()
        }
        authorizedResponse({
            response
        })

    }
}