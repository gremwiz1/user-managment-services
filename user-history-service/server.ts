import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import historyRoutes from './src/routes/historyRoutes';
import { loggerMiddleware } from './src/middleware/loggerMiddleware';
import { errorHandlerMiddleware } from './src/middleware/errorHandlerMiddleware';
import { rateLimitMiddleware } from './src/middleware/rateLimitMiddleware';

const app: Application = express();

// Безопасность HTTP-заголовков
app.use(helmet());

// Логирование запросов
app.use(loggerMiddleware);

// Ограничение частоты запросов
app.use(rateLimitMiddleware);

// Обработка JSON тел запросов
app.use(express.json());

// Маршруты приложения
app.use('/api', historyRoutes);

// Общая обработка ошибок
app.use(errorHandlerMiddleware);

const port: number = parseInt(process.env.PORT as string, 10) || 3001;

app.listen(port, () => {
  console.log(`User History Service is running on port ${port}`);
});
