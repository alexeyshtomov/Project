const { sendApiRequest } = require('./api');

const requestData = {
  event: 'update',
};

const endpoint = '';
(async () => {
  try {
    const response = await sendApiRequest(endpoint, requestData);
    const halls = response.halls.result;
    const films = response.films.result;
    const seances = response.seances.result;

    console.log('Список залов:', halls);
    console.log('Список фильмов:', films);
    console.log('Список сеансов:', seances);
  } catch (error) {
    // Обработка ошибок
    console.error('Произошла ошибка:', error);
  }
})();