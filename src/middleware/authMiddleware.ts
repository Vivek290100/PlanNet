import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response';
import { MESSAGES } from '../utils/constants';
import { User } from '../models/UserModel';

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, MESSAGES.UNAUTHORIZED, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return sendError(res, MESSAGES.UNAUTHORIZED, 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, MESSAGES.UNAUTHORIZED, 401);
  }
};