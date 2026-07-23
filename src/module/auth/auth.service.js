import { selectMany, selectOne } from "../../common/repo/select.js"
import { updateOneRecord } from "../../common/repo/update.js"
import { addManyRecords, addOneRecord } from "../../common/repo/add.js"
import UserModel from "../../model/user.model.js";
import { generateToken, loginCredentials, decodeToken, verifyToken } from "../../common/token/token.js"
// SIGN UP 
export const signupService = async (data) => {
    const isExist = await selectOne({
        databaseType: "mongoDB",
        model: UserModel,
        whereClause: {
            email: data.email
        }
    })
    if (isExist) {
        throw new Error("Email Is Already Exist !")
    }
    return await addOneRecord({
        databaseType: "mongoDB",
        model: UserModel,
        attributes: data
    })
}
// LOGIN
export const loginService = async (email, password) => {
    const user = await selectOne({
        databaseType: "mongoDB",
        model: UserModel,
        whereClause: {
            email: email
        }
    })
    if (!user) {
        throw new Error("Email Dosent't Exist !")
    }
    const accessToken = generateToken({
        payload: {
            _id: user._id,
            role: user.role
        },
        secretKey: process.env.USER_ACCESS_SECRET,
        options: {
            expiresIn: "2h",
            audience: [],
            issuer: "sarah-app"
        }
    })
    const refreshToken = generateToken({
        payload: {
            _id: user._id,
            role: user.role
        },
        secretKey: process.env.USER_REFRESH_SECERT,
        options: {
            expiresIn: "7d",
            audience: [],
            issuer: "sarah-app"
        }
    })
    return { accessToken, refreshToken }
}
// GET PROFILE
export const getProfileService = async (userId) => {

    const user = await selectOne({
        databaseType: "mongoDB",
        model: UserModel,
        whereClause: {
            _id: userId
        }
    });

    if (!user) {
        throw new Error("User not found!");
    }

    return user;
};
// UPDATE PROFILE 
export const updateProfileService = async (userId, data) => {
    return await updateOneRecord({
        databaseType: "mongoDB",
        model: UserModel,
        value : data,
        whereClause: {
            _id: userId,
        },
    });
};
// RESET PASSWORD 
export const resetPasswordService = async (email,password)=>{
    const user = await selectOne({
        databaseType: "mongoDB",
        model: UserModel,
        whereClause: {
            email: email
        }
    })
    if (!user) {
        throw new Error("Email Dosent't Exist !")
    }
    const newPassword = await updateOneRecord({
        databaseType: "mongoDB",
        model: UserModel,
        value : {
            password : password
        },
        whereClause: {
            email: email,
        },
    });
    return newPassword
    
}