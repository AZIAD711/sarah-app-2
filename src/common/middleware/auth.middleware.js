import { request, response } from "express"
import { decodeToken, verifyToken } from "../token/token.js"
import { authorizedResponse, invalidTokenResponse} from "../response/error.js"
// AUTHENCATION MIDDELWARE FUNCTION 
export const authentication = () => {
    return (request, response, next) => {
        try {
            const authorization = request.headers.authorization;

            if (!authorization) {
                return invalidTokenResponse({
                    response,
                    message: "Authorization header is required."
                });
            }

            if (!authorization.startsWith("Bearer ")) {
                return invalidTokenResponse({
                    response,
                    message: "Invalid token format."
                });
            }

            const token = authorization.split(" ")[1];

            const decoded = verifyToken(
                token,
                process.env.USER_ACCESS_SECRET
            );

            request.user = decoded;
            console.log(decoded)
            request.token = token;
            console.log(token)

            next();

        } catch (error) {
            console.log(error)
            return invalidTokenResponse({
                response,
                message: error.message
            });
        }
    };
};
// AUTHORIZATION MIDDELWARE FUNCTION
export const authorization = (...roles) => {
    return (request, response, next) => {

        if (!request.user) {
            return authorizedResponse({
                response,
                message: "Unauthorized."
            });
        }

        if (!roles.includes(request.user.role)) {
            return authorizedResponse({
                response,
                message: "You are not allowed to access this resource."
            });
        }

        next();
    };
};