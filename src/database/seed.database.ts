import User from '../models/user.model';

const presetUsers = [
  {
    name: 'John',
    login: 'johnslogin',
  },
  {
    name: 'Jane',
    login: 'johnslogin',
  },
  {
    name: 'Jack',
    login: 'johnslogin',
  },
];

export async function seeder(): Promise<void> {
  for (const user of presetUsers) {
    await new User({
      name: user.name,
      login: user.login,
    }).save();
  }
}
