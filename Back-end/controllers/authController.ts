import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import usersModel from '../Models/userModel';
import { Users } from '../Interfaces/userInterface';
import bcrypt from 'bcryptjs';
import customErrors from '../middlware/Errors';
import { createToken } from '../middlware/createToken';


export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user: Users = await usersModel.create(req.body);
  res.status(201).json({data: user })
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = await usersModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new customErrors('Invalid email or password', 401));
  }
  const token = createToken(user._id, user.role);
  res.status(200).json({ token, message: 'logged in successfully' });
});