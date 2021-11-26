import mongoose, { Schema } from 'mongoose';
import { ICartItem } from '../interfaces/cart.interface';

const CartSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  products: [
    {
      productId: Number,
      amount: Number,
      price: Number,
    },
  ],
});

const Carts = mongoose.model<ICartItem>('Cart', CartSchema);

export default Carts;
