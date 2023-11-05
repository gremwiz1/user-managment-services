import express from 'express';
import { getUserActions } from '../controllers/historyController';

const router = express.Router();

router.get('/user-actions', getUserActions);

export default router;
