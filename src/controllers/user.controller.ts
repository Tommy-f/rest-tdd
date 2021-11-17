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
      next(new HttpException(404, 'User Not Found'));
    }
    res.json(users);
  } catch (error) {
    throw new HttpException(500, 'Internal Error');
  }
};
