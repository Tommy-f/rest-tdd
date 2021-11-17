import { NotFound, InternalServer } from '../errors/api.errors';
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
      next(new NotFound('User'));
    }
    res.json(users);
  } catch (error) {
    throw new InternalServer();
  }
};
