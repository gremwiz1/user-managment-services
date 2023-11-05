const pool = require('../db');
const { sendEventToHistoryService } = require('../services/eventService');

// сообщения об ошибках базы данных
const handleDbError = (error) => {
  switch (error.code) {
    case '23505': // Код ошибки PostgreSQL для нарушения уникальности
      return 'Этот электронный адрес уже используется.';
    default:
      return 'Произошла ошибка при работе с базой данных.';
  }
};

// Создание пользователя
const createUser = async (req, res) => {
  const { name, email } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *', 
      [name, email]
    );
    const newUser = result.rows[0];
    
    // Отправляем событие в сервис истории
    await sendEventToHistoryService('create', `Пользователь ${newUser.id} создан`, newUser.id);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    res.status(500).json({ error: handleDbError(error) });
  } finally {
    client.release();
  }
};

// Обновление информации пользователя
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', 
      [name, email, id]
    );
    const updatedUser = result.rows[0];
    
    // Отправляем событие в сервис истории
    await sendEventToHistoryService('update', `Пользователь ${updatedUser.id} обновлен`, updatedUser.id);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    res.status(500).json({ error: handleDbError(error) });
  } finally {
    client.release();
  }
};

// Получение списка пользователей
const getUsers = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении списка пользователей.' });
  } finally {
    client.release();
  }
};

module.exports = {
  createUser,
  updateUser,
  getUsers
};
