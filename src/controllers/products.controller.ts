import { IProduct } from './../interfaces/products.interface';
import { HttpException } from '../errors/api.errors';
import Products from '../models/products.model';
import type { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const products: Array<Document> = await Products.find();
    if (!products) {
      throw new HttpException(404, 'No Products Found');
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const product: Document | null = await Products.findOne({
      id: req.params.id,
    });
    if (!product) {
      throw new HttpException(404, 'Product Not Found');
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};
