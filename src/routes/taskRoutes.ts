// src/routes/taskRouter.ts
import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { Dependencies } from '../utils/dependencies.js';
import { TaskRoutes } from '../utils/constants.js';
import { validate } from '../middleware/validate.js';
import { createTaskSchema, updateTaskSchema } from '../validation/schemas.js';

const { taskController } = Dependencies;

const taskRouter = Router();

taskRouter.use(protect);

taskRouter
  .post(TaskRoutes.CREATE, validate(createTaskSchema), taskController.createTask)
  .get(TaskRoutes.GET_ALL, taskController.getAllTasks)
  .get(TaskRoutes.GET_ONE, taskController.getTask)
  .put(TaskRoutes.UPDATE, validate(updateTaskSchema), taskController.updateTask)
  .delete(TaskRoutes.DELETE, taskController.deleteTask);

export default taskRouter;