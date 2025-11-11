import { Response } from 'express';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const sendSuccess = <T>(res: Response, message: string, data?: T, status = 200) => {
  const response: ApiResponse<T> = { success: true, message };
  if (data) response.data = data;
  return res.status(status).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  status: number = 500,
  data?: any
) => {
  res.status(status).json({
    success: false,
    message,
    data,
  });
};