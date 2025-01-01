import { NextFunction, Request, Response } from "express";
import AddToCartDto from "../dtos/AddCart.dto";
import userModel from "../models/User.model";
import CartData from "../types/CartData";
import ApiResponse from "../utils/ApiResponse";
import UpdateCartDto from "../dtos/UpdateCart.dto";

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

        await userModel.findByIdAndUpdate(userId, {cartData})
        return res.status(201).json(new ApiResponse(201,{cartData}, "Added To Cart"));
    } catch (error) {
        next(error)
    }
}

// Update Cart
const updateCart = async (req: Request<{},{}, UpdateCartDto>, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {userId, itemId, size, quantity} = req.body;

        const userData = await userModel.findById(userId);
        const cartData: CartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})

        return res.status(201).json(new ApiResponse(201,{}, "Cart Updated"));
    } catch (error) {
        next(error)
    }
}

// Get User Cart
const getUserCart = async (req: Request<{},{}, {userId: string}>, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        const cartData = await userData.cartData;

        return res.status(200).json(new ApiResponse(200, {cartData}, "Cart Data Sent"))
    } catch (error) {
        next(error)
    }
}

export {addToCart, updateCart, getUserCart};