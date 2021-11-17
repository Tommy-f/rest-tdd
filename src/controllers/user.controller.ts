import { NotFound, InternalServer } from '../errors/api.errors';
import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let user: Object;
  try {
    user = await User.findOne({ name: 'Örjan' });
    console.log(user);
    if (!user) {
      console.log('inside');
      throw new NotFound('User not found');
    }
  } catch (error) {
    throw new InternalServer();
  }
  res.json(user);
  //   next();
};
