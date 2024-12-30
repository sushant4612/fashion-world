import { NextFunction, Request, Response } from "express";
import AddToCartDto from "../dtos/AddCart.dto";
import userModel from "../models/User.model";
import CartData from "../types/CartData";
import ApiResponse from "../utils/ApiResponse";

// Add Product to Cart
const addToCart = async (req: Request<{},{}, AddToCartDto>, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {userId, itemId, size} = req.body;
        const userData = await userModel.findById(userId);
        let cartData: CartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, cartData)
        return res.status(201).json(new ApiResponse(201,{}, "Added To Cart"));
    } catch (error) {
        next(error)
    }
}

// Update Cart
const updateCart = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        
    } catch (error) {
        next(error)
    }
}

// Get User Cart
const getUserCart = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        
    } catch (error) {
        next(error)
    }
}