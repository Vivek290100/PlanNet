import { Request, Response } from 'express';
import { IAuthService } from '../interfaces/IAuthService.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { MESSAGES } from '../utils/constants.js';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

export class AuthController {
  constructor(private authService: IAuthService) {}

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [name, email, password]
   *             properties:
   *               name: { type: string, minLength: 2, example: Vivek }
   *               email: { type: string, format: email, example: vivek@example.com }
   *               password: { type: string, minLength: 6, example: 123456 }
   *     responses:
   *       201:
   *         description: User registered
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: { type: boolean }
   *                 message: { type: string }
   *                 data:
   *                   type: object
   *                   properties:
   *                     user: { $ref: '#/components/schemas/User' }
   *                     token: { type: string }
   */
  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const result = await this.authService.register(name, email, password);
      sendSuccess(res, MESSAGES.USER_REGISTERED, result, 201);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  };

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Login user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [email, password]
   *             properties:
   *               email: { type: string, format: email }
   *               password: { type: string }
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: { type: boolean }
   *                 message: { type: string }
   *                 data:
   *                   type: object
   *                   properties:
   *                     user: { $ref: '#/components/schemas/User' }
   *                     token: { type: string }
   */
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      sendSuccess(res, MESSAGES.LOGIN_SUCCESS, result);
    } catch (error: any) {
      sendError(res, error.message, 401);
    }
  };
}