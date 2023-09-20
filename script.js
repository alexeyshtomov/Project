document.addEventListener('DOMContentLoaded', function () {
    // Обработчик события для кнопки "Забронировать билеты"
    const reserveButton = document.getElementById('reserveButton');
    if (reserveButton) {
      reserveButton.addEventListener('click', function () {
        const ticketQuantityInput = document.getElementById('ticketQuantity');
        const sessionSelect = document.getElementById('sessionSelect');
        const reservationStatus = document.getElementById('reservationStatus');
  
        const ticketQuantity = parseInt(ticketQuantityInput.value);
        const selectedSession = sessionSelect.options[sessionSelect.selectedIndex].text;
  
        //код для бронирования билетов 
  
        // пример
        const message = `Вы успешно забронировали ${ticketQuantity} билет(ов) на сеанс "${selectedSession}".`;
        reservationStatus.textContent = message;
      });
    }
  
    // Другие обработчики событий и код, который  нужен 
  });