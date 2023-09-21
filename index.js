// Базовый URL API
const apiUrl = 'https://jscp-diplom.netoserver.ru/';

// Функция для отправки POST-запроса
async function sendPostRequest(endpoint, data) {
  try {
    const response = await fetch(apiUrl + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data, // Ваш запрос в формате x-www-form-urlencoded
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    // Распарсить ответ в формате JSON
    const jsonResponse = await response.json();
    
    

    return jsonResponse;
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

const requestData = 'event=update';
sendPostRequest('', requestData) 
  .then((data) => {
    // Обработка данных из ответа API
    const halls = data.halls.result; // Список залов
    const films = data.films.result; // Список фильмов
    const seances = data.seances.result; // Список сеансов

    
    console.log('Список залов:', halls);
    console.log('Список фильмов:', films);
    console.log('Список сеансов:', seances);
  });