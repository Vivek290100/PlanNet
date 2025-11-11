import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';
const PORT = process.env.PORT ?? '5000';
const MONGO_URI = process.env.MONGO_URI;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required in .env');
}

if (!MONGO_URI) {
  throw new Error('MONGO_URI is required in .env');
}

export const env = {
  JWT_SECRET: JWT_SECRET as string,
  JWT_EXPIRES_IN: JWT_EXPIRES_IN as string,
  PORT: PORT as string,
  MONGO_URI: MONGO_URI as string,
};