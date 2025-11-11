import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { MESSAGES } from '../utils/constants';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return sendError(res, err.message, 400);
  }
  if ( err.name === 'CastError') {
    return sendError(res, 'Invalid ID format', 400);
  }
  if (err.code === 11000) {
    return sendError(res, 'Duplicate field value entered', 400);
  }

  return sendError(res, MESSAGES.SERVER_ERROR, 500, err);
};