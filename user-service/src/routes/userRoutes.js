const express = require('express');
const userController = require('../controllers/userController');
const { createUserValidationRules, updateUserValidationRules, validate } = require('../middleware/validation');

const router = express.Router();

router.post('/create-user', createUserValidationRules(), validate, userController.createUser);

router.put('/update-user/:id', updateUserValidationRules(), validate, userController.updateUser);

router.get('/users', userController.getUsers);

module.exports = router;
