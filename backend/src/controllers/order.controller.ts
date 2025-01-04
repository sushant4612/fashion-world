import { NextFunction, Request, Response } from "express";



//Placing order using COD
const placeOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        
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