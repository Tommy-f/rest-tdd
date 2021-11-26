import mongoose, { Schema } from 'mongoose';
import { ICart } from '../interfaces/cart.interface';

const CartSchema: Schema = new Schema({
  userId: {
    type: String,
    ref: 'Users',
  },
  products: [
    {
      productId: String,
      amount: Number,
    },
  ],
});

const Carts = mongoose.model<ICart>('Cart', CartSchema);

export default Carts;
