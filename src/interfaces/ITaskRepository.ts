// C:\Users\vivek_laxvnt1\Desktop\PlanNet\src\interfaces\ITaskRepository.ts
import { Types } from 'mongoose';
import { ITask } from './ITask';

export interface ITaskRepository {
  create(taskData: Partial<ITask>): Promise<ITask>;
  findById(id: string): Promise<ITask | null>;
  findAllByUser(userId: Types.ObjectId): Promise<ITask[]>;
  update(id: string, updateData: Partial<ITask>): Promise<ITask | null>;
  delete(id: string): Promise<ITask | null>;
}