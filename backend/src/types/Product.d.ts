import { Document } from "mongoose";

export interface IProduct extends Document{
    name: string,
    description : string,
    price : number,
    image : Array,
    category : string,
    subCategory : string,
    sizes : Array,
    bestseller : boolean,
    date : number
}