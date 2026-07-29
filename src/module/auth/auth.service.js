import { selectMany, selectOne } from "../../common/repo/select.js"
import { updateOneRecord } from "../../common/repo/update.js"
import { addManyRecords, addOneRecord } from "../../common/repo/add.js"
import UserModel from "../../model/user.model.js";
import TokenModel from "../../model/token.model.js";
import { sendEmail } from "../../common/utils/mail.js"
import { generateToken, loginCredentials, decodeToken, verifyToken } from "../../common/token/token.js"
import { generateOTP } from "../../common/utils/generate-otp.js";
import { deleteRecord, exsitRecord, flushAllRecords, getRecord, mGetRecords, otpTemplateWtihEmail, setRecord } from "../../common/utils/redis.js"
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
        value: data,
        whereClause: {
            _id: userId,
        },
    });
};
// FORGET PASSWORD
export const forgetPasswordService = async (email) => {
    const isExist = await selectOne({
        databaseType: "mongoDB",
        model: UserModel,
        whereClause: {
            email: email,
            confirmEmail: true
        }
    })
    if (!isExist) {
        throw new Error("Email Is Not Exist !")
    }
    const otp = generateOTP()
    const addOtp = await setRecord(otpTemplateWtihEmail(email), otp, 60)
    const emailSend = await sendEmail({
        toValue: email,
        subjectValue: "Reset Password",
        htmlValue: `<h1>Hello to sarah App👋</h1><br><h2>OTP : ${otp}</h2>`
    })
}
// RESET PASSWORD 
export const resetPasswordService = async (email, password) => {
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
        value: {
            password: password
        },
        whereClause: {
            email: email,
        },
    });
    return newPassword

}
// LOGOUT 
export const logoutService = async (body, user, decoded) => {
    if (body?.flag === "all") {
        user.changeCredintals = new Date()
        await user.save()
        await TokenModel.deleteMany({
            userId: user._id
        })
        return
    }
    else {
        await TokenModel.create({
            userId: user._id,
            expireIn: new Date(decoded.exp * 60 * 1000),
            jti: decoded.jti
        })
    }
}