import jwt from "jsonwebtoken";
import { TokenType } from "../enum/token-type.js";
import { UserRole } from "../enum/user-role.js";

// Generate Token
export const generateToken = ({
    payload,
    secretKey,
    options = {
        expiresIn: "1h",
        notBefore: 0,
        audience: [],
        issuer: "sarah-app",
    },
}) => {
    return jwt.sign(payload, secretKey, options);
};

// Verify Token
export const verifyToken = (token, secretKey) => {
    return jwt.verify(token, secretKey);
};

// Decode Token
export const decodeToken = (token) => {
    return jwt.decode(token);
};

// Login Credentials
export const loginCredentials = (role) => {
    switch (role) {
        case UserRole.USER:
            return {
                [TokenType.ACCESS]: process.env.USER_ACCESS_SECRET,
                [TokenType.REFRESH]: process.env.USER_REFRESH_SECRET,
            };

        case UserRole.ADMIN:
            return {
                [TokenType.ACCESS]: process.env.ADMIN_ACCESS_SECRET,
                [TokenType.REFRESH]: process.env.ADMIN_REFRESH_SECRET,
            };

        default:
            throw new Error("Invalid role");
    }
};