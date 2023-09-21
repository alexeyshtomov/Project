// Функция для получения схемы посадочных мест на выбранный сеанс
async function getHallConfig(timestamp, hallId, seanceId) {
    const apiUrl = 'https://jscp-diplom.netoserver.ru/';
  
    // Формируем данные для POST-запроса
    const requestData = `event=get_hallConfig&timestamp=${timestamp}&hallId=${hallId}&seanceId=${seanceId}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestData,
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
  
      const jsonResponse = await response.json();
      
      // Обработка данных схемы посадочных мест
      const hallConfig = jsonResponse.hallConfig; 
  
      return hallConfig;
    } catch (error) {
      console.error('Произошла ошибка:', error);
      return null;
    }
  }
  
  
  const timestamp; 
  const hallId = ''; 
  const seanceId = ''; 
  
  getHallConfig(timestamp, hallId, seanceId)
    .then((hallConfig) => {
      if (hallConfig) {
        console.log('Схема посадочных мест:', hallConfig);
        
      }
    });