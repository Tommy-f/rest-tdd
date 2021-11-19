import mongoose from 'mongoose';
import { IProduct } from '../interfaces/products.interface';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  login: { type: String, required: true },
});

const Products = mongoose.model<IProduct>('Products', ProductSchema);

export default Products;
