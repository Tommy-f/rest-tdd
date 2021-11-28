import { Document } from 'mongoose';
import Carts from '../models/carts.model';
import { HttpException } from '../errors/api.errors';


export const deleteExistingCart = async (id: string): Promise<void> => {
  if (!id) {
    throw new HttpException(400, 'No id provided in the query');
  }

  const carts: Document | null = await Carts.findOne({ id });

  if (!id) {
    throw new HttpException(404, `Carts ${id} does not exist`);
  }

  await carts.delete();
};
