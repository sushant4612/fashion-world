import mongoose from "mongoose"

const connectDb = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB Connected");    
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/fashion-world`)
}

export default connectDb;