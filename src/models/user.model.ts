import mongoose from 'mongoose';
import { IUser } from '../interfaces/users.interface';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  login: { type: String, required: true },
});

const Users = mongoose.model<IUser>('Users', UserSchema);

export default Users;
