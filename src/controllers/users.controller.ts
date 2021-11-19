import { HttpException } from '../errors/api.errors';
import Users from '../models/users.model';
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
    const user: Document | null = await Users.findById({ _id: req.params.id });
    if (!user) {
      throw new HttpException(404, 'User Not Found');
    }
    res.json(user);
  } catch (error) {
    next(error);
    throw new HttpException(500, 'Internal Error');
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newUser = await new Users({
      name: req.body.name,
      login: req.body.login,
    }).save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
    throw new HttpException(500, 'Internal Error');
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: Document | null = await Users.findById({ _id: req.params._id });
    if (!user) {
      throw new HttpException(404, 'User Not Found');
    }
    await Users.deleteOne({ _id: req.params._id });
    res.status(200).json({ message: 'User Deleted' });
  } catch (error) {
    next(error);
    throw new HttpException(500, 'Internal Error');
  }
};
