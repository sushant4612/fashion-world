import mongoose, { Model, Schema } from "mongoose";
import { IOrder } from "../types/Order";

const orderSchema = new Schema<IOrder>({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: [],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Order Placed"
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Number,
        required: true
    }
})

const OrderModel: Model<IOrder> = mongoose.models.order || mongoose.model<IOrder>('order', orderSchema);

export default OrderModel;