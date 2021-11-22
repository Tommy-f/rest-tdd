import { HttpException } from '../errors/api.errors';
import Users from '../models/users.model';
import type { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import { findUserById, createNewUser } from '../services/users.services';
import { IUser } from '../interfaces/users.interface';

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
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData = await findUserById(req.params.login);
    const name = userData.name
    const login = userData.login
    res.status(200).json({ login, name });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newUser: IUser = req.body;
    await createNewUser(newUser);

    res.status(201).json({ data: newUser, message: 'New user added!' });
  } catch (error) {
    next(error);
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
    next(error);
  }
};
