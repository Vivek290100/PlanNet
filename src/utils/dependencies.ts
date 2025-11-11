import { AuthController } from '../controllers/authController.js';
import { TaskController } from '../controllers/taskController.js';
import { AuthService } from '../services/authService.js';
import { TaskService } from '../services/taskService.js';
import { UserRepository } from '../repositories/userRepository.js';
import { TaskRepository } from '../repositories/TaskRepository.js';

// Repositories
const userRepo = new UserRepository();
const taskRepo = new TaskRepository();

// Services
const authService = new AuthService(userRepo);
const taskService = new TaskService(taskRepo);

// Controllers
const authController = new AuthController(authService);
const taskController = new TaskController(taskService);

export const Dependencies = {
  userRepo,
  taskRepo,
  authService,
  taskService,
  authController,
  taskController,
} as const;