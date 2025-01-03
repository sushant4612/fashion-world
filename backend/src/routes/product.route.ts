import { Router } from "express";
import adminAuth from "../middlewares/adminAuth.middleware";
import upload from "../middlewares/multer.middleware";
import { addProduct, listProducts, removeProducts, singleProduct } from "../controllers/product.controller";

const productRouter = Router();

productRouter.route('/add').post(adminAuth, upload.fields([{name: 'image1', maxCount: 1},{name: 'image2', maxCount: 1},{name: 'image3', maxCount: 1},{name: 'image4', maxCount: 1}]), addProduct);
productRouter.route('/remove').post(adminAuth, removeProducts);
productRouter.route('/single').post(singleProduct);
productRouter.route('/list').post(listProducts);

export default productRouter;