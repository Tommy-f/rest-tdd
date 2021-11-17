import { HttpException } from '../errors/api.errors';
import Users from '../models/user.model';
import type { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: Array<Document> = await Users.find();
    if (!users) {
      throw new HttpException(404, 'Users Not Found');
    }
    res.json(users);
  } catch (error) {
    next(error);
    throw new HttpException(500, 'Internal Error');
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: Document = await Users.findById({ _id: req.params.id });
    if (!user) {
      throw new HttpException(404, 'User Not Found');
    }
    res.json(user);
  } catch (error) {
    next(error);
    throw new HttpException(500, 'Internal Error');
  }
};
