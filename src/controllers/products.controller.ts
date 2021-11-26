import { IProduct } from './../interfaces/products.interface';
import { HttpException } from '../errors/api.errors';
import Products from '../models/products.model';
import type { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import { deleteExistingProduct } from '../services/products.services';

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const products: Array<Document> = await Products.find();
    if (!products || products.length === 0) {
      throw new HttpException(204, 'No products found');
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
      throw new HttpException(404, 'Product not found');
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const newProduct = await new Products({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    }).save();
    return res.status(201).json(newProduct);
  } catch (error) {
    throw new HttpException(500, 'Could not create product');
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const filter = { id: req.params.id };
  const update: Document<IProduct> = req.body;
  console.log(update);
  try {
    if (update.hasOwnProperty('id')) {
      throw new HttpException(400, 'Cannot update id');
    }
    console.log('HERE');
    const updatedProduct: Document | null = await Products.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );

    return res
      .status(201)
      .json({ message: 'Product updated!', data: updatedProduct });
  } catch (error) {
    throw new HttpException(500, 'Could not update product');
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    await deleteExistingProduct(req.params.id);
    return res.status(200).json({ message: 'Product deleted!' });
  } catch (error) {
    next(error);
  }
};
