import Joi from "joi";

export const loginSchema ={
     body : Joi.object({
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
    }).and("email","password")
};