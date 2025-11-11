import { Document, Types } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'pending' | 'completed';
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}