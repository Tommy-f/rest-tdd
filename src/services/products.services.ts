import { Document } from 'mongoose';
import Products from '../models/products.model';
import { HttpException } from '../errors/api.errors';


export const deleteExistingProduct = async (id: string): Promise<void> => {
  if (!id) {
    throw new HttpException(400, 'No id provided in the query');
  }

  const products: Document | null = await Products.findOne({ id });
  if (!id) {
    throw new HttpException(404, `Products ${id} does not exist`);
  }

  await products.delete();
};
