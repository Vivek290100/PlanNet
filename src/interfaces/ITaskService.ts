// C:\Users\vivek_laxvnt1\Desktop\PlanNet\src\interfaces\ITaskService.ts
import { Types } from 'mongoose';
import { ITask } from './ITask';

export interface ITaskService {
  createTask(title: string, description: string, userId: Types.ObjectId): Promise<ITask>;
  getUserTasks(userId: Types.ObjectId): Promise<ITask[]>;
  getTaskById(id: Types.ObjectId, userId: Types.ObjectId): Promise<ITask>;
  updateTask(id: Types.ObjectId, updates: Partial<ITask>, userId: Types.ObjectId): Promise<ITask>;
  deleteTask(id: Types.ObjectId, userId: Types.ObjectId): Promise<{ message: string }>;
}