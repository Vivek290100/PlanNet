export const AuthRoutes = {
  REGISTER: '/register',
  LOGIN: '/login',
} as const;

export const TaskRoutes = {
  CREATE: '/',
  GET_ALL: '/',
  GET_ONE: '/:id',
  UPDATE: '/:id',
  DELETE: '/:id',
} as const;

export const STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
};

export const MESSAGES = {
  USER_REGISTERED: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  INVALID_CREDENTIALS: 'Invalid email or password',
  TASK_CREATED: 'Task created successfully',
  TASK_FETCHED: 'Task fetched successfully',
  TASKS_FETCHED: 'Tasks fetched successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'You do not have permission to perform this action',
  NOT_FOUND: 'Task not found',
  SERVER_ERROR: 'Internal server error',
};


export type AuthRouteKeys = keyof typeof AuthRoutes;
export type TaskRouteKeys = keyof typeof TaskRoutes;
