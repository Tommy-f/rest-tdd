import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/users.interface';

const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true },
});

const Users = mongoose.model<IUser>('Users', UserSchema);

export default Users;
