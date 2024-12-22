import { Document } from "mongoose";

export interface IOrder extends Document{
    userId: string,
    items: Array<any>,
    amount: number,
    address: Record<string, any>,
    status: string,
    paymentMethod: string,
    payment: boolean,
    date: number
}