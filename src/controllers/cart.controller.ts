import { HttpException } from '../errors/api.errors';
import Products from '../models/products.model';
import type { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import { IProduct } from './../interfaces/products.interface';
import { ICart, ICartProduct } from './../interfaces/cart.interface';
import { deleteExistingCart } from '../services/carts.services'
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
): Promise<Response> => {
  const userId = req.params.userLogin;
  const { productId, amount } = req.body as ICartProduct;
  try {
    let cart = (await Carts.findOne({ userId })) as ICart;
    console.log(cart);
    if (!cart) {
      cart = await new Carts({
        userId: userId,
        products: [],
      }).save();
      console.log(cart);
    }

    const product: IProduct = await Products.findOne({ productId: productId });
    if (!product) {
      throw new HttpException(404, `Product with id ${productId} not found`);
    }

    const cartItem = cart.products.find(
      (p: ICartProduct) => p.productId === productId
    );
    if (cartItem) {
      cartItem.amount += amount;
    } else {
      cart.products.push({
        productId: productId,
        amount: amount,
      });
    }

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const updateItemInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const userId = req.params.userLogin;
  const productId = req.params.id;
  const { amount } = req.body as { amount: number };
  try {
    if (!amount) {
      throw new HttpException(400, 'Amount is required');
    }

    const product: IProduct = await Products.findOne({ productId: productId });
    if (!product) {
      throw new HttpException(404, `Product with id ${productId} not found`);
    }

    let cart = (await Carts.findOne({ userId })) as ICart;
    if (!cart) {
      cart = await new Carts({
        userId: userId,
        products: [{ productId: productId, amount: amount }] as ICartProduct[],
      }).save();
      return res.status(200).json(cart);
    }

    const cartItem = cart.products.find(
      (p: ICartProduct) => p.productId === productId
    );
    if (cartItem) {
      cartItem.amount += amount;
    } else {
      cart.products.push({
        productId: productId,
        amount: amount,
      });
    }

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    await deleteExistingCart(req.params.id);
    return res.status(200).json({ message: 'Product deleted!' });
  } catch (error) {
    next(error);
  }
};
