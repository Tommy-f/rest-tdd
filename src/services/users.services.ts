import { IUser } from '../interfaces/users.interface';
import Users from '../models/users.model';
import { HttpException } from '../errors/api.errors';
import { isEmpty } from '../utils/utils';

export const findUserById = async (login: string): Promise<IUser> => {
  if (isEmpty(login)) {
    throw new HttpException(400, 'No id provided in the query');
  }

  const findUser: IUser = await Users.findOne({ login: login });
  if (!findUser) {
    throw new HttpException(404, 'No user with that login');
  }

  return findUser;
};

export const createNewUser = async (userData: IUser): Promise<IUser> => {
  if (isEmpty(userData)) {
    throw new HttpException(400, 'No user data provided in the query');
  }

  const findUser: IUser = await Users.findOne({ login: userData.login });
  if (findUser) {
    throw new HttpException(409, `User ${userData.login} already exists`);
  }

  const newUser = await new Users({
    name: userData.name,
    login: userData.login,
  }).save();

  return newUser;
};
