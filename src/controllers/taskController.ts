import { Request, Response } from 'express';
import { ITaskService } from '../interfaces/ITaskService.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { MESSAGES } from '../utils/constants.js';
import { Types } from 'mongoose';

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

export class TaskController {
  constructor(private taskService: ITaskService) {}

  /**
   * @swagger
   * /tasks:
   *   post:
   *     summary: Create a new task
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [title, description]
   *             properties:
   *               title:
   *                 type: string
   *                 example: Learn TypeScript
   *               description:
   *                 type: string
   *                 example: Master backend with DI
   *     responses:
   *       201:
   *         description: Task created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Task'
   *       400:
   *         $ref: '#/components/schemas/ErrorResponse'
   */
createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    // throw new Error("Simulated server crash!");
    const userId = req.user!._id;
    const task = await this.taskService.createTask(title, description, userId);
    sendSuccess(res, MESSAGES.TASK_CREATED, task, 201);
  } catch (error: any) {
    sendError(res, error.message, 400);
  }
};

  /**
   * @swagger
   * /tasks:
   *   get:
   *     summary: Get all tasks for the authenticated user
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of user's tasks
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Task'
   *       400:
   *         $ref: '#/components/schemas/ErrorResponse'
   */
  getAllTasks = async (req: Request, res: Response) => {
    try {
      const userId = req.user!._id.toString();
      const tasks = await this.taskService.getUserTasks(userId);
      sendSuccess(res, MESSAGES.TASKS_FETCHED, tasks);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  };

  /**
   * @swagger
   * /tasks/{id}:
   *   get:
   *     summary: Get a task by ID
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         example: 672a1b2c9d3e4f5a6b7c8d9e
   *     responses:
   *       200:
   *         description: Task found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Task'
   *       404:
   *         $ref: '#/components/schemas/ErrorResponse'
   *       403:
   *         $ref: '#/components/schemas/ErrorResponse'
   */
getTask = async (req: Request, res: Response) => {
  try {
    const taskId = new Types.ObjectId(req.params.id);
    const userId = req.user!._id;
    const task = await this.taskService.getTaskById(taskId, userId);
    sendSuccess(res, MESSAGES.TASK_FETCHED, task);
  } catch (error: any) {
    sendError(res, error.message, error.message === MESSAGES.NOT_FOUND ? 404 : 403);
  }
};

  /**
   * @swagger
   * /tasks/{id}:
   *   put:
   *     summary: Update a task
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             minProperties: 1
   *             properties:
   *               title: { type: string }
   *               description: { type: string }
   *               status: { type: string, enum: [pending, completed] }
   *     responses:
   *       200:
   *         description: Task updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Task'
   *       400:
   *         $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         $ref: '#/components/schemas/ErrorResponse'
   *       403:
   *         $ref: '#/components/schemas/ErrorResponse'
   */
updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = new Types.ObjectId(req.params.id);
    const userId = req.user!._id;
    const task = await this.taskService.updateTask(taskId, req.body, userId);
    sendSuccess(res, MESSAGES.TASK_UPDATED, task);
  } catch (error: any) {
    sendError(res, error.message, error.message === MESSAGES.NOT_FOUND ? 404 : 403);
  }
};

  /**
   * @swagger
   * /tasks/{id}:
   *   delete:
   *     summary: Delete a task
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Task deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: { type: boolean }
   *                 message: { type: string }
   *       404:
   *         $ref: '#/components/schemas/ErrorResponse'
   *       403:
   *         $ref: '#/components/schemas/ErrorResponse'
   */
deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = new Types.ObjectId(req.params.id);
    const userId = req.user!._id;
    const result = await this.taskService.deleteTask(taskId, userId);
    sendSuccess(res, result.message);
  } catch (error: any) {
    sendError(res, error.message, error.message === MESSAGES.NOT_FOUND ? 404 : 403);
  }
};
}