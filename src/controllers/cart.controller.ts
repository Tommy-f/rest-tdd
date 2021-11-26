import { HttpException } from '../errors/api.errors';
import Products from '../models/products.model';
import type { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import { IProduct } from './../interfaces/products.interface';
import { ICartItem } from './../interfaces/cart.interface';
import Carts from '../models/carts.model';

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const userId = req.params.login;
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
