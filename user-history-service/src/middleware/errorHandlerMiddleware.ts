import { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${err.message}`);
  res.status(500).send('Внутренняя ошибка сервера');
};
