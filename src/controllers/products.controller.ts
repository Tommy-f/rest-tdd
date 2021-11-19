import { IProduct } from './../interfaces/products.interface';
import { HttpException } from '../errors/api.errors';
import Products from '../models/products.model';
import type { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products: Array<IProduct> = await Products.find();
    if (!products) {
      throw new HttpException(404, 'No Products Found');
    }
    res.json(products);
  } catch (error) {
    next(error);
    throw new HttpException(500, 'Internal Error');
  }
};
