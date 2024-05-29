import express from "express";
import {registerUser, login, myProfile } from "../controllers/user.js";
import { isAuth } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(login);
userRouter.route('/me').get(isAuth, myProfile);

export default userRouter;