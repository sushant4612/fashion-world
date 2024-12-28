import { NextFunction, Request, RequestHandler, Response } from "express";
import { CreateUserDto, CreateUserSchema } from "../dtos/CreateUser.dto";
import userModel from "../models/User.model";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { LoginDto, LoginSchema} from "../dtos/Login.dto";

// Create Token
const createToken = (id: string): string => {
    const secret = process.env.JWT_SECRET
    if(!secret){
        throw new ApiError(404, "JWT_SECRET is not defined in environment variables")
    }
    return jwt.sign({id}, secret);
}

// Route for user register
const registerUser = async (req: Request<{},{}, CreateUserDto>, res: Response, next: NextFunction): Promise<any> => {
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
        next(error)
    }
}

// Route for user login
const login = async (req: Request<{},{},LoginDto>, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {email, password} = LoginSchema.parse(req.body);

        const user = await userModel.findOne({email});

        if(!user){
            throw new ApiError(400, "User doesn't exists");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = createToken(user._id);
            return res.status(200).json(new ApiResponse(200, token, "Login successfully"))
        }else{
            throw new ApiError(404, "Invalid credentials");
        }
    } catch (error) {
        next(error);
    }
} 

// Route for admin login
const adminLogin = async (req: Request<{},{}, LoginDto>, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {email, password} = LoginSchema.parse(req.body);
        
        console.log(email, password, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
            if(!process.env.JWT_SECRET){
                throw new ApiError(404, "JWT_SECRET is not defined in environment variables");
            }
            const secret: string = process.env.JWT_SECRET;
            const token = jwt.sign(email + password, secret);
            return res.status(200).json(new ApiResponse(200, token, "Login successfully"));
        }else{
            throw new ApiError(404, "Invalid credentials");
        }
    } catch (error) {
        next(error);
    }
} 

export  {
    registerUser,
    login,
    adminLogin
}