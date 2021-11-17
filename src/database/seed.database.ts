import User from '../models/user.model';

const presetUsers = [
  {
    _id: 1,
    name: 'John',
    login: 'johnslogin',
  },
  {
    _id: 2,
    name: 'Jane',
    login: 'janeslogin',
  },
  {
    _id: 3,
    name: 'Jack',
    login: 'jackslogin',
  },
];

export async function seeder(): Promise<void> {
  for (const user of presetUsers) {
    await new User({
      _id: user._id,
      name: user.name,
      login: user.login,
    }).save();
  }
}
