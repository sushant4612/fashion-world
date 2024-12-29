import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/User";


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {
    minimize: false
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema);