import { Schema, connect, model, ConnectOptions } from 'mongoose';
import { IUser } from '../interfaces/interface.users';

const schema = new Schema<IUser>({
  name: { type: String, required: true },
});

const UserModel = model<IUser>('User', schema);

export async function seeder(): Promise<void> {
  const user = new UserModel({
    name: 'John',
  });

  await user.save();
  console.log(user.name);
}
