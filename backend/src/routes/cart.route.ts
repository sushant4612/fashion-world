import express from 'express';
import authUser from '../middlewares/auth.middleware';
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controller';

const cartRouter = express.Router();

cartRouter.route('/get').get(authUser, getUserCart);
cartRouter.route('/add').post(authUser, addToCart);
cartRouter.route('/update').post(authUser, updateCart);

export default cartRouter