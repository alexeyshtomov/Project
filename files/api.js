async function sendApiRequest(endpoint, requestData) {
  const apiUrl = 'https://jscp-diplom.netoserver.ru/';

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const requestBody = new URLSearchParams(requestData).toString();

  try {
    const response = await fetch(apiUrl + endpoint, {
      method: 'POST',
      headers,
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error('Произошла ошибка при отправке запроса:', error);
    throw error;
  }
}

module.exports = {
  sendApiRequest,
};