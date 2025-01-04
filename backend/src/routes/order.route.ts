import { Router } from "express";
import adminAuth from "../middlewares/adminAuth.middleware";
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verfifyRazorPay } from "../controllers/order.controller";
import authUser from "../middlewares/auth.middleware";

const orderRouter = Router();

// Admin Features
orderRouter.route('/list').post(adminAuth, allOrders);
orderRouter.route('/status').post(adminAuth, updateStatus);

//Payment Feature
orderRouter.route('/place').post(authUser,placeOrder)
orderRouter.route('/razorpay').post(authUser,placeOrderRazorpay)

// User Feature
orderRouter.route('/userorders').post(authUser,userOrders)

//verfiy payment
orderRouter.route('/verifyRazorpay').post(authUser, verfifyRazorPay)

export default orderRouter;