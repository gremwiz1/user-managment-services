const { body, validationResult } = require('express-validator');

// Валидация для создания пользователя
const createUserValidationRules = () => {
  return [
    body('name').trim().notEmpty().withMessage('Имя обязательно к заполнению'),
    body('email').isEmail().withMessage('Необходимо указать действительный адрес электронной почты')
  ];
};

// Валидация для обновления пользователя
const updateUserValidationRules = () => {
  return [
    body('name').optional().trim().notEmpty().withMessage('Имя не может быть пустым'),
    body('email').optional().isEmail().withMessage('Необходимо указать действительный адрес электронной почты')
  ];
};

// Проверка результатов валидации
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => ({ ...err, msg: err.msg })) });
  }
  next();
};

module.exports = {
  createUserValidationRules,
  updateUserValidationRules,
  validate
};
