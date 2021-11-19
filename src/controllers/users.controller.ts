import { HttpException } from '../errors/api.errors';
import Users from '../models/users.model';
import type { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const users: Array<Document> = await Users.find();
    if (users.length === 0) {
      throw new HttpException(404, 'Users Not Found');
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const user: Document | null = await Users.findOne({
      login: req.params.login,
    });
    if (!user) {
      throw new HttpException(404, 'User Not Found');
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const newUser = await new Users({
      name: req.body.name,
      login: req.body.login,
    }).save();
    return res.status(201).json(newUser);
  } catch (error) {
    throw new HttpException(500, 'Could not create user');
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const user: Document | null = await Users.findOne({
      login: req.params.login,
    });
    if (!user) {
      throw new HttpException(404, 'User Not Found');
    }
    await user.delete();
    return res.status(200).json({ message: 'User Deleted' });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};
