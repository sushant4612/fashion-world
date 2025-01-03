import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';

const adminAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.headers.token as string;
        if(!token){
            return res.status(401).json(new ApiError(401, "Not Authorized Login Again"));
        }
        
   
        if(!process.env.JWT_SECRET){
            throw new ApiError(404, "JWT_SECRET is not defined in environment variables")
        }
        const secret = process.env.JWT_SECRET
        const token_decode = jwt.verify(token, secret) as jwt.JwtPayload;


        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            throw new ApiError(500, "Admin credentials are not defined in environment variables");
        }

        if (token_decode.email !== adminEmail || token_decode.password !== adminPassword) {
            return res.status(401).json(new ApiError(401, "Not Authorized Login Again"));
        }
        next()
     } catch (error) {
        next(error);
     }
}


export default adminAuth