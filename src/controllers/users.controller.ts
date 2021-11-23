import { HttpException } from '../errors/api.errors';
import Users from '../models/users.model';
import type { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import {
  findUserById,
  createNewUser,
  deleteExistingUser,
} from '../services/users.services';
import { IUser } from '../interfaces/users.interface';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const users: Array<Document> = await Users.find();
    if (!users || users.length === 0) {
      throw new HttpException(204, 'No users found');
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
): Promise<Response> => {
  try {
    const userData = await findUserById(req.params.login);
    const name = userData.name;
    const login = userData.login;

    return res.status(200).json({ login, name });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const newUser: IUser = req.body;
    await createNewUser(newUser);

    return res.status(201).json({ data: newUser, message: 'New user added!' });
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
    await deleteExistingUser(req.params.login);
    return res.status(200).json({ message: 'User deleted!' });
  } catch (error) {
    next(error);
  }
};
