import { request, response } from "express"
import { decodeToken, verifyToken } from "../token/token.js"
import { authorizedResponse, invalidTokenResponse } from "../response/error.js"
import UserModel from "../../model/user.model.js"
// AUTHENCATION MIDDELWARE FUNCTION 
export const authentication = () => {
    return async (request, response, next) => {
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

            const user = await UserModel.findById(decoded._id);

            if (!user) {
                throw new Error("User not found.");
            }

            request.user = user;      
            request.token = token;

            if (
                user.changeCredintals &&
                user.changeCredintals.getTime() >= decoded.iat * 1000
            ) {
                throw new Error("Token has been already expired!");
            }

            next();

        } catch (error) {
            console.log(error);
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