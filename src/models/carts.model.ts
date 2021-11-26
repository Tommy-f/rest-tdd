import mongoose, { Schema } from 'mongoose';
import { ICart } from '../interfaces/cart.interface';

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

const Carts = mongoose.model<ICart>('Cart', CartSchema);

export default Carts;