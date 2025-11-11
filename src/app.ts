// C:\Users\vivek_laxvnt1\Desktop\PlanNet\src\app.ts
import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './database';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import { swaggerSpec } from './docs/swagger';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger - http://localhost:${PORT}/docs`);
  });
};

startServer();