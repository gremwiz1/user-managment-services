const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  };
  
  module.exports = errorHandlerMiddleware;
  