import { NextFunction, Request, Response } from "express";
import PlaceOrderDto from "../dtos/PlaceOrder.dto";
import orderModel from "../models/Order.model";
import userModel from "../models/User.model";
import ApiResponse from "../utils/ApiResponse";
import Razorpay from "razorpay"
import ApiError from "../utils/ApiError";
import dotenv from 'dotenv';
dotenv.config();

const currency = 'inr';

// gateway initialize
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

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
        
        await userModel.findByIdAndUpdate(userId, {cartData: {}})
        res.status(201).json(new ApiResponse(201, {}, "Product Placed"))
    } catch (error) {
        console.log(error);
        
        next(error);
    }
}

//Placing Order using razorpay
const placeOrderRazorpay =  async (req: Request<{},{},PlaceOrderDto>, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment:false,
            date: Date.now()
        }

        const newOrder: any = new orderModel(orderData);
        await newOrder.save();
        console.log("1st");
        

        const options = {
            amount: amount * 100 ,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }
        console.log("2nd");
        

        await razorpayInstance.orders.create(options, (error, order) => {
            if(error){
                throw new ApiError(400, "Error in Razorpay", [error]);
            }
            res.json({success: true, order})
        })
    } catch (error) {
        next(error);
    }
}

//verfiy razorpay
const verfifyRazorPay = async (req: Request<{},{},{userId: string, razorpay_order_id: string}>, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {userId, razorpay_order_id} = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})

            res.json(new ApiResponse(200,{}, "Payment Successful"));
        }else{
            throw new ApiError(400, 'Payment Failed');
        }
    } catch (error) {
        next(error);
    }
}

//All Order Data for admin panel
const allOrders = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const orders = await orderModel.find({})
        res.status(200).json(new ApiResponse(200, orders, "Success"));
    } catch (error) {
        next(error);
    }
}

//User Order data for frontend
const userOrders = async (req: Request<{},{},{userId: string}>, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {userId} = req.body;
        const order = await orderModel.find({userId})
        res.status(200).json(new ApiResponse(200, order, "Success"));
    } catch (error) {
        next(error);
    }
}

//Update Order Status from Admin Panel
const updateStatus = async (req: Request<{},{}, {orderId: string, status: string}>, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.status(200).json(new ApiResponse(200, {}, "Status Updated"));
    } catch (error) {
        next(error);
    }
}


export {
    placeOrder,
    placeOrderRazorpay,
    verfifyRazorPay,
    allOrders,
    userOrders,
    updateStatus
}