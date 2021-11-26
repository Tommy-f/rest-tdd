import { HttpException } from '../errors/api.errors';
import Products from '../models/products.model';
import type { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import { IProduct } from './../interfaces/products.interface';
import { ICart, ICartProduct } from './../interfaces/cart.interface';
import Carts from '../models/carts.model';

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const userId = req.params.userLogin;
    let cart: Document = await Carts.findOne({ userId });
    if (!cart) {
      cart = await new Carts({
        userId: userId,
        products: [],
      }).save();
      return res
        .status(201)
        .json({ message: `Cart created for user ${userId}` });
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.userLogin;
  const { productId, amount } = req.body as ICartProduct;
  try {
    let cart: ICart = await Carts.findOne({ userId });
    if (!cart) {
      cart = await new Carts({
        userId: userId,
        products: [],
      }).save();
    }

    const product: IProduct = await Products.findOne({ productId: productId });
    if (!product) {
      throw new HttpException(404, `Product with id ${productId} not found`);
    }

    const cartItem = cart.products.find((p) => p.productId === productId);
    if (cartItem) {
      cartItem.amount += amount;
    } else {
      cart.products.push({
        productId: productId,
        amount: amount,
      });
    }

    // return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
