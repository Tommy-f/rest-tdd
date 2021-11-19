import type { Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  price: number;
}
