import express from 'express';
import { adminLogin, login, registerUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(login);
userRouter.route('/admin').post(adminLogin);

export default userRouter