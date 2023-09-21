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
      body: data, 
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    
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

  function displayHalls(halls) {
    const hallList = document.getElementById('hall-list');
    hallList.innerHTML = ''; 
  
    halls.forEach((hall) => {
      const hallItem = document.createElement('div');
      hallItem.textContent = `Зал: ${hall.hall_name}, Ряды: ${hall.hall_rows}, Места: ${hall.hall_places}`;
      hallList.appendChild(hallItem);
    });
  }
  
  function displayFilms(films) {
    const filmList = document.getElementById('film-list');
    filmList.innerHTML = ''; 
  
    films.forEach((film) => {
      const filmItem = document.createElement('div');
      filmItem.textContent = `Фильм: ${film.film_name}, Продолжительность: ${film.film_duration} минут, Страна: ${film.film_origin}`;
      filmList.appendChild(filmItem);
    });
  }
  
  function displaySeances(seances) {
    const seanceList = document.getElementById('seance-list');
    seanceList.innerHTML = ''; 
  
    seances.forEach((seance) => {
      const seanceItem = document.createElement('div');
      seanceItem.textContent = `Сеанс: ${seance.seance_time}`;
      seanceList.appendChild(seanceItem);
    });
  }