import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../interfaces/products.interface';

const ProductSchema: Schema<IProduct> = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
}, { versionKey: false });

const Products = mongoose.model<IProduct>('Products', ProductSchema);

export default Products;
