// src/routes/authRouter.ts
import { Router } from 'express';
import { Dependencies } from '../utils/dependencies';
import { AuthRoutes } from '../utils/constants.js';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema } from '../validation/schemas';

const { authController } = Dependencies;

const authRouter = Router();

authRouter
  .post(AuthRoutes.REGISTER, validate(registerSchema), authController.register)
  .post(AuthRoutes.LOGIN, validate(loginSchema), authController.login);

export default authRouter;