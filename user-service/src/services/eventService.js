const axios = require('axios');

const HISTORY_SERVICE_ENDPOINT = 'http://localhost:3001/api/user-actions';

const sendEventToHistoryService = async (actionType, details, userId) => {
  try {
    await axios.post(HISTORY_SERVICE_ENDPOINT, {
      actionType,
      details,
      userId
    });
  } catch (error) {
    console.error('Ошибка при отправке события в сервис истории:', error);
  }
};

module.exports = {
  sendEventToHistoryService
};
