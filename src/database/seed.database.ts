import User from '../models/user.model';

export async function seeder(): Promise<void> {
  const user = new User({
    name: 'John',
    login: 'johnslogin',
  });

  await user.save();
  console.log(user.name);
}
