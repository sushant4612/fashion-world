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

        const imagesUrl: string[] = await Promise.all(
            images.map(async (item: Express.Multer.File): Promise<string> => {
              const result = await cloudinary.uploader.upload(item.path, {
                resource_type: "image",
              });              
              return result.secure_url;
            })
        );
        

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
        const products = await productModel.find({});
        res.status(200).json(new ApiResponse(200, products, "Data SuccessFully Sent"));
    } catch (error) {
        next(error);
    }
}

//Function for remove product
const removeProducts = async (req: Request<{},{},{id: string}>, res: Response, next: NextFunction):Promise<any> => {
    try {
        const {id} = req.body;
        await productModel.findByIdAndDelete(id);
        res.status(200).json(new ApiResponse(200,{}, 'Deleted Successfully'))
    } catch (error) {
        next(error);
    }
}

//Function for single product
const singleProduct = async (req: Request<{},{},{productId: string}>, res: Response, next: NextFunction):Promise<any> => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.status(200).json(new ApiResponse(200,product, "Data SuccessFully Sent"))
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