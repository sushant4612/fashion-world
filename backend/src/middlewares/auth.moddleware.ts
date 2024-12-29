import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError";

const authUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.token as string;

    if(!token){
        return res.status(401).json(new ApiError(401, "Not Authorized Login Again"));
    }
    
    try {
        if(!process.env.JWT_SECRET){
            throw new ApiError(404, "JWT_SECRET is not defined in environment variables")
        }
        const secret = process.env.JWT_SECRET
        const token_decode = jwt.verify(token, secret) as jwt.JwtPayload;

        req.body.userId = token_decode.id;
        next()
     } catch (error) {
        next(error);
     }
}