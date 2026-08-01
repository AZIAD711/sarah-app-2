import {signupController,loginController,getProfileController,updateProfileController,resetPasswordController,logoutController,forgetPasswordController, setStatusAccountByAdminController, deleteAccountController} from "./auth.controller.js"

import {authentication,authorization} from "../../common/middleware/auth.middleware.js"
import express from "express"
import { UserRole } from "../../common/enum/user-role.js"
import { deleteAccountSchema, loginSchema ,resetPasswordSchema,signupSchema } from "./auth.valdition.js"
import { schemaValidate } from "../../common/middleware/valdiate.middelware.js"
import { validateFiles } from "../../common/utils/multer.js"
import { localFileStorage,validateFiles } from "../../common/utils/multer.js"
const userRouter = express.Router()
userRouter.post("/signup",schemaValidate(signupSchema),localFileStorage(localFileStorage({ folder: "profile-images", type: validateFiles.image })).single("profileImage"),signupController)
userRouter.post("/reset/password",resetPasswordController)
userRouter.post("/forget/password",forgetPasswordController)
userRouter.post("/login",schemaValidate(loginSchema),loginController)
userRouter.post("/logout",authentication(),authorization(UserRole.USER),logoutController)
userRouter.get("/profile",authentication(),authorization(UserRole.USER),getProfileController)
userRouter.put("/update/profile",authentication(),authorization(UserRole.USER) ,updateProfileController)
userRouter.patch("/status/account/:userId",authentication(),authorization(UserRole.ADMIN),setStatusAccountByAdminController)
userRouter.delete("/kill/:userId",schemaValidate(deleteAccountSchema),authentication(),authorization(UserRole.ADMIN),deleteAccountController)
export default userRouter