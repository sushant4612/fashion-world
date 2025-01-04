import { NextFunction, Request, Response } from "express";
import PlaceOrderDto from "../dtos/PlaceOrder.dto";
import orderModel from "../models/Order.model";
import userModel from "../models/User.model";
import ApiResponse from "../utils/ApiResponse";



//Placing order using COD
const placeOrder = async (req: Request<{},{},PlaceOrderDto>, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        
        await userModel.findById(userId, {cartData: {}})

        res.status(201).json(new ApiResponse(201, {}, "Product Placed"))
    } catch (error) {
        next(error);
    }
}

//Placing Order using razorpay
const placeOrderRazorpay =  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        
    } catch (error) {
        next(error);
    }
}

//verfiy razorpay
const verfifyRazorPay = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        
    } catch (error) {
        next(error);
    }
}

//All Order Data for admin panel
const allOrders = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        
    } catch (error) {
        next(error);
    }
}

//User Order data for frontend
const userOrders = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        
    } catch (error) {
        next(error);
    }
}

//Update Order Status from Admin Panel
const updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        
    } catch (error) {
        next(error);
    }
}


export default {
    placeOrder,
    placeOrderRazorpay,
    verfifyRazorPay,
    allOrders,
    userOrders,
    updateStatus
}