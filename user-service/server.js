const express = require('express');
const helmet = require('helmet');
const userRoutes = require('./src/routes/userRoutes');
const loggerMiddleware = require('./src/middleware/loggerMiddleware');
const errorHandlerMiddleware = require('./src/middleware/errorHandlerMiddleware');
const rateLimitMiddleware = require('./src/middleware/rateLimitMiddleware');

const app = express();

// Безопасность HTTP-заголовков
app.use(helmet());

// Логирование запросов
app.use(loggerMiddleware);

// Ограничение частоты запросов
app.use(rateLimitMiddleware);

// Обработка JSON тел запросов
app.use(express.json());

// Маршруты приложения
app.use('/api', userRoutes);

// Общая обработка ошибок
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`User Service is running on port ${port}`);
});