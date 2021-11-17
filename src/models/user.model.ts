import mongoose from 'mongoose';
import { IUser } from '../interfaces/users.interface';

const UserSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    name: { type: String, required: true, unique: true },
    login: { type: String, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const Users = mongoose.model<IUser>('Users', UserSchema);

export default Users;
