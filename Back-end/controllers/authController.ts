import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import usersModel from '../Models/userModel';
import { Users } from '../Interfaces/userInterface';
import bcrypt from 'bcryptjs';
import customErrors from '../middlware/Errors';
import { createToken } from '../middlware/createToken';
import Jwt , {JwtPayload} from 'jsonwebtoken';

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

interface newRequest extends Request { user?: Users; }
export const protectRoute = asyncHandler(async (req:newRequest, res: Response, next: NextFunction): Promise <any> => {
    let token: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else { return next(new customErrors('login first to access the application', 401)) }
    
    const decodedToken: any = Jwt.verify(token, process.env.JWT_SECRET_KEY!);

    const currentUser = await usersModel.findById(decodedToken._id);
    if (!currentUser) { return next(new customErrors("user doesn't exist", 401)) }

    req.user = currentUser;
    next();
});

export const allowedTo = (...roles: string[]) => asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  if (!(roles.includes(req.user?.role!))) {
    return next(new customErrors("you can't access this", 403))
  }
  next();
});