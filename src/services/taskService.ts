// src/services/taskService.ts
import { ITask, ITaskRepository, ITaskService } from '../interfaces/Index';
import { MESSAGES } from '../utils/constants';
import { Types } from 'mongoose';

export class TaskService implements ITaskService {
  constructor(private taskRepo: ITaskRepository) {}

  async createTask(title: string, description: string, userId: Types.ObjectId): Promise<ITask> {
    return await this.taskRepo.create({ title, description, user: userId });
  }

  async getTaskById(id: Types.ObjectId, userId: Types.ObjectId): Promise<ITask> {
    const task = await this.taskRepo.findById(id.toHexString());
    if (!task) throw new Error(MESSAGES.NOT_FOUND);
    if (!task.user.equals(userId)) throw new Error(MESSAGES.FORBIDDEN);
    return task;
  }

  async getUserTasks(userId: Types.ObjectId): Promise<ITask[]> {
    return await this.taskRepo.findAllByUser(userId);
  }

  async updateTask(id: Types.ObjectId, updateData: Partial<ITask>, userId: Types.ObjectId): Promise<ITask> {
    const task = await this.taskRepo.findById(id.toHexString());
    if (!task) throw new Error(MESSAGES.NOT_FOUND);
    if (!task.user.equals(userId)) throw new Error(MESSAGES.FORBIDDEN);

    const updated = await this.taskRepo.update(id.toHexString(), updateData);
    if (!updated) throw new Error(MESSAGES.NOT_FOUND);
    return updated;
  }

  async deleteTask(id: Types.ObjectId, userId: Types.ObjectId): Promise<{ message: string }> {
    const task = await this.taskRepo.findById(id.toHexString());
    if (!task) throw new Error(MESSAGES.NOT_FOUND);
    if (!task.user.equals(userId)) throw new Error(MESSAGES.FORBIDDEN);

    await this.taskRepo.delete(id.toHexString());
    return { message: MESSAGES.TASK_DELETED };
  }
}