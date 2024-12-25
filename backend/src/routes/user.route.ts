import express from 'express';
import { registerUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/register').post(registerUser)

export default userRouter