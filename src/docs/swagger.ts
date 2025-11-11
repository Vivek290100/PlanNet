import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PlanNet API',
      version: '1.0.0',
      description: 'A secure task management API with JWT authentication and Zod validation',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token (from /auth/login)',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '671f3a1b9c8d2e1f4a5b6c7d' },
            name: { type: 'string', example: 'Vivek' },
            email: { type: 'string', example: 'vivek@example.com' },
          },
        },
        Task: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '672a1b2c9d3e4f5a6b7c8d9e' },
            title: { type: 'string', example: 'Learn TypeScript' },
            description: { type: 'string', example: 'Master backend with DI' },
            status: { type: 'string', enum: ['pending', 'completed'], example: 'pending' },
            user: { type: 'string', example: '671f3a1b9c8d2e1f4a5b6c7d' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Validation failed' },
            status: { type: 'integer', example: 400 },
            data: {
              type: 'object',
              properties: {
                errors: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: { type: 'string' },
                      message: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    './src/controllers/authController.ts',
    './src/controllers/taskController.ts',
  ],
};

export const swaggerSpec = swaggerJSDoc(options);