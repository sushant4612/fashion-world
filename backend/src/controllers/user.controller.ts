import { Request, RequestHandler, Response } from "express";
import { CreateUserDto, CreateUserSchema } from "../dtos/CreateUser.dto";
import userModel from "../models/User.model";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

// Create Token
const createToken = (id: string): string => {
    const secret = process.env.JWT_SECRET
    if(!secret){
        throw new ApiError(404, "JWT_SECRET is not defined in environment variables")
    }
    return jwt.sign({id}, secret);
}

// Route for user register
const registerUser = async (req: Request<{},{}, CreateUserDto>, res: Response): Promise<any> => {
    try {
        const {name, email, password } = CreateUserSchema.parse(req.body);

        const exists = await userModel.findOne({email});
        if(exists){
            throw new ApiError(400,"User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        return res.status(200).json(new ApiResponse(200, token, "User registered successfully "))

    } catch (error: any) {
        console.log(error);
        throw new ApiError(404, error.message)
    }
}

// Route for user login


// Route for admin login


export  {
    registerUser
}