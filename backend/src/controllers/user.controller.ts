import { Request, Response } from "express";
import { CreateUserDto, CreateUserSchema } from "../dtos/createUser.dto";
import userModel from "../models/User.model";
import bcrypt from 'bcrypt'

// Route for user login
const registerUser = async (req: Request<{},{}, CreateUserDto>, res: Response): Promise<Response> => {
    try {
        const {name, email, password } = CreateUserSchema.parse(req.body);


        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        return res.status(200).json({
            success: true,
        })

    } catch (error: any) {
        console.log(error);
        return res.json(404).json({
            success: false,
            message: error.message
        })
    }
}

// Route for user register


// Route for admin login
