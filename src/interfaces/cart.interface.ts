// import Users from './'

import { Document } from 'mongoose';
import { IUser } from './users.interface';

export interface ICart extends Document {
  userId?: IUser['login'];
  products: ICartProduct[];
}

export interface ICartProduct {
  productId: string;
  amount: number;
}

// export interface ICart extends Array<ICartItem> {}

// export interface ICart {
//   [index: number]: ICartItem;
// }
