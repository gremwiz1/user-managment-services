import express from 'express';
import getUserActions from '../controllers/historyController';
import { validateRequest } from '../middleware/validateRequest';
import { param, query } from 'express-validator';

const router = express.Router();

router.get('/user-actions',
  [
    param('userId').isNumeric(),
    query('page').optional().isNumeric(),
    query('pageSize').optional().isNumeric(),
    validateRequest
  ],
  getUserActions
);

export default router;
