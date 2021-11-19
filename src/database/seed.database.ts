import Users from '../models/users.model';
import Products from '../models/products.model';

const presetUsers = [
  {
    name: 'John',
    login: 'johnslogin',
  },
  {
    name: 'Jane',
    login: 'janeslogin',
  },
  {
    name: 'Jack',
    login: 'jackslogin',
  },
];

const presetProducts = [
  {
    name: 'Product 1',
    price: 100,
  },
  {
    name: 'Product 2',
    price: 200,
  },
  {
    name: 'Product 3',
    price: 300,
  },
];

export async function seeder(): Promise<void> {
  for (const user of presetUsers) {
    await new Users({
      name: user.name,
      login: user.login,
    }).save();
  }
  // for (const product of presetProducts) {
  //   await new Products({
  //     name: product.name,
  //     price: product.price,
  //   }).save();
  // }
}
