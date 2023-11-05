import { Request, Response } from 'express';
import pool from '../db/index';

const getUserActions = async (req: Request, res: Response) => {
  const { userId, page = 1, pageSize = 10 } = req.query;

  const offset = (page as number - 1) * (pageSize as number);

  try {
    const client = await pool.connect();
    const queryResult = await client.query(
      'SELECT * FROM user_actions WHERE user_id = $1 ORDER BY action_date DESC LIMIT $2 OFFSET $3',
      [userId, pageSize, offset]
    );
    res.status(200).json(queryResult.rows);
  } catch (error) {
    console.error('Ошибка при получении истории действий пользователя:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении истории действий пользователя.' });
  } finally {
    await pool.end();
  }
};

export default getUserActions;
