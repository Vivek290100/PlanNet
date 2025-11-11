import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { MESSAGES } from '../utils/constants';
import { env } from '../config/env';
import { IAuthService, IUserRepository } from '../interfaces/Index';

export class AuthService implements IAuthService {
  constructor(private userRepo: IUserRepository) {}

  async register(name: string, email: string, password: string) {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepo.create({ name, email, password: hashedPassword });

    const token = this.generateToken(user._id.toString());
    return {
      user: { id: user._id.toString(), name: user.name, email: user.email },
      token,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error(MESSAGES.INVALID_CREDENTIALS);
    }

    const token = this.generateToken(user._id.toString());
    return {
      user: { id: user._id.toString(), name: user.name, email: user.email },
      token,
    };
  }

  private generateToken(userId: string): string {
    return jwt.sign({ id: userId }, env.JWT_SECRET as any, { expiresIn: env.JWT_EXPIRES_IN } as any);
  }
}