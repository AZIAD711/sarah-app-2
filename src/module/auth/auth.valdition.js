import Joi from "joi";
import { Gender } from "../../common/enum/gender.js"
import { SystemProvider } from "../../common/enum/system-provider.js"
import { UserRole } from "../../common/enum/user-role.js"
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
// SIGN UP SCHEMA 
export const signupSchema = {
    body: loginSchema.body.keys({
        // FIRST NAME 
        firstName: Joi.string().required().messages({
            "string.base": "First Name  must be a string!",
            "string.empty": "First Name  field cannot be empty!",
            "any.required": "First Name  field is required!",
        }),
        // LAST NAME 
        lastName: Joi.string().required().messages({
            "string.base": "Last Name  must be a string!",
            "string.empty": "Last Name  field cannot be empty!",
            "any.required": "Last Name  field is required!",
        }),
        // PHONE NUMBER 
        phoneNumber: Joi.string().required().length(11).messages({
            "string.base": "Phone Number  must be a string!",
            "string.empty": "Phone Number  field cannot be empty!",
            "any.required": "Phone Number field is required!",
            "string.length": "Phone Number length should be 11 characters !",
        }),
        // AGE
        age: Joi.number().required().min(18).max(100).messages({
            "number.base": "Age  must be a string!",
            "number.empty": "Age  field cannot be empty!",
            "any.required": "Age  field is required!",
            "number.max": "Age max length should be 100 characters !",
            "number.min": "Age min length should be 18 characters !",
        }),
        // ADDRESS
        address: Joi.string().empty("").default("Not data provided !").messages({
            "string.base": "Address must be a string!",
        }),
        // GENDER
        gender: Joi.string().required().valid(Gender.MALE, Gender.FEMALE).messages({
            "string.base": "Gender must be a string!",
            "string.empty": "Gender  field cannot be empty!",
            "any.required": "Gender  field is required!",
        }),
        // SYSTEM PROVIDER
        systemProvider: Joi.string().empty("").default(SystemProvider.OWN).valid(SystemProvider.OWN, SystemProvider.GOOGLE).messages({
            "string.base": "System Provider must be a string!",
        }),
        // ROLE
        role: Joi.string().empty("").default(UserRole.USER).valid(UserRole.USER, UserRole.ADMIN).messages({
            "string.base": "Role must be a string!",
        }),
    })
}
