import Joi from "joi";
// LOGIN SCHEMA 
export const loginSchema = {
    body: Joi.object({
        // EMAIL
        email: Joi.string()
            .email({ maxDomainSegments: 2 })
            .required()
            .messages({
                "string.base": "Email must be a string!",
                "string.email": "Please enter a valid email!",
                "string.empty": "Email field cannot be empty!",
                "any.required": "Email field is required!",
            }),
        // PASSWORD
        password: Joi.string()
            .required()
            .messages({
                "string.base": "Password must be a string!",
                "string.empty": "Password field cannot be empty!",
                "any.required": "Password field is required!",
            }),
    }).and("email", "password")
};
// RESET PASSWORD SCHEMA 
export const resetPasswordSchema = {
    body: Joi.object({
        // EMAIL
        email: Joi.string()
            .email({ maxDomainSegments: 2 })
            .required()
            .messages({
                "string.base": "Email must be a string!",
                "string.email": "Please enter a valid email!",
                "string.empty": "Email field cannot be empty!",
                "any.required": "Email field is required!",
            }),
        // NEW PASSWORD
        newPassword: Joi.string().length(6)
            .required()
            .messages({
                "string.base": "New Passsword must be a string!",
                "string.empty": "New Passsword field cannot be empty!",
                "any.required": "New Passsword field is required!",
                "string.length": "New Passsword length should be 6 characters !",
            }),
        // CONFIRM PASSWORD
        confrimPassword: Joi.string().length(6)
            .required()
            .valid(Joi.ref("newPassword"))
            .messages({
                "string.base": "Confirm password must be a string!",
                "string.empty": "Confirm password field cannot be empty!",
                "any.required": "Confirm password field is required!",
                "string.length": "Confirm password length should be 6 characters !",
                "any.only": "Confirm password must match password."
            })
    }).and("newPassword", "confrimPassword")
}