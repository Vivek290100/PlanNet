// src/repositories/TaskRepository.ts
import { Types } from 'mongoose';
import { ITask, ITaskRepository } from '../interfaces/Index';
import { Task } from '../models/TaskModel';

export class TaskRepository implements ITaskRepository {
  async create(taskData: Partial<ITask>): Promise<ITask> {
    return await Task.create(taskData);
  }

  async findById(id: string): Promise<ITask | null> {
    return await Task.findById(id).populate('user', 'name email');
  }

  async findAllByUser(userId: Types.ObjectId): Promise<ITask[]> {
    return await Task.find({ user: userId }).populate('user', 'name email');
  }

  async update(id: string, updateData: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, updateData, { new: true }).populate('user', 'name email');
  }

  async delete(id: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(id);
  }
}