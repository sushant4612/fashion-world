import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from "./config/mongodb";
import cloudinaryConnect from "./config/cloudinary";
import userRouter from "./routes/user.route";
import morgan from "morgan";

//App Config
dotenv.config()
const app = express();
const PORT = process.env.PORT || 4000;
connectDb()
cloudinaryConnect();

//morgan
app.use(morgan("dev"))

//middlewares
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

//routes
app.use('/api/user', userRouter)

app.get("/", (req, res) => {
    res.send("Api Working")
});

app.listen(PORT, () => {
    console.log(`App is listening at port http://localhost:${PORT} `);
})