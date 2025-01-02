import {v2 as cloudinary} from 'cloudinary'
import { NextFunction, Request, Response } from 'express'
import AddProductDto from '../dtos/AddProduct.dto';
import productModel from '../models/Product.model';
import ApiResponse from '../utils/ApiResponse';


//Function for adding product
const addProduct = async (req: Request<{},{},AddProductDto>, res: Response, next: NextFunction):Promise<any> => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const image1 = files?.image1 && (files.image1[0] as Express.Multer.File);
        const image2 = files?.image2 && (files.image2[0] as Express.Multer.File);
        const image3 = files?.image3 && (files.image3[0] as Express.Multer.File);
        const image4 = files?.image4 && (files.image4[0] as Express.Multer.File);

        const images = [image1, image2, image3, image4].filter((item): item is Express.Multer.File => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = cloudinary.uploader.upload(item.path,
                    {resource_type: 'image'}
                )
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === true ? true : false,
            sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes),
            image : imagesUrl,
            date : Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.status(201).json(new ApiResponse(201, {}, "Product Added"))
    } catch (error) {
        next(error);
    }
}

//Function for list all product
const listProducts = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        
    } catch (error) {
        next(error);
    }
}

//Function for remove product
const removeProducts = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        
    } catch (error) {
        next(error);
    }
}

//Function for single product
const singleProduct = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        
    } catch (error) {
        next(error);
    }
}

export {
    listProducts,
    addProduct,
    removeProducts,
    singleProduct
}