import express from "express";
import { login, register, sendEmail, userProfile, verifyOTP } from "../controllers/user.js";
import { verifyLogin } from "../middlewares/index.js";

const userRouter = express.Router()

userRouter.post("/register",register,sendEmail)
userRouter.post("/login",login, sendEmail)
userRouter.post("/verifyOTP", verifyOTP)
userRouter.get("/userProfile",verifyLogin,userProfile)

export default userRouter