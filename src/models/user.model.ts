import mongoose from 'mongoose';
import { IUser } from '../interfaces/users.interface';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  login: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
