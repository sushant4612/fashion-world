import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from "./config/mongodb";
import cloudinaryConnect from "./config/cloudinary";


//App Config
dotenv.config()
const app = express();
const PORT = process.env.PORT || 4000;
connectDb()
cloudinaryConnect();

//middlewares
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("Api Working")
});

app.listen(PORT, () => {
    console.log(`App is listening at port http://localhost:${PORT} `);
})