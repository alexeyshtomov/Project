document.addEventListener('DOMContentLoaded', function () {
    // ...
  
    
    if (reserveButton) {
      reserveButton.addEventListener('click', function () {
        const ticketQuantityInput = document.getElementById('ticketQuantity');
        const sessionSelect = document.getElementById('sessionSelect');
        const rowSelect = document.getElementById('rowSelect');
        const seatSelect = document.getElementById('seatSelect');
        const reservationStatus = document.getElementById('reservationStatus');
  
        const ticketQuantity = parseInt(ticketQuantityInput.value);
        const selectedSession = sessionSelect.options[sessionSelect.selectedIndex].text;
        const selectedRow = rowSelect.options[rowSelect.selectedIndex].text;
        const selectedSeat = seatSelect.options[seatSelect.selectedIndex].text;
  
        
  
        // код для бронирования билетов
  
        // пример
        const message = `Вы успешно забронировали ${ticketQuantity} билет(ов) на сеанс "${selectedSession}" в ряде ${selectedRow}, место ${selectedSeat}.`;
        reservationStatus.textContent = message;
      });
  
      // Обновляем опции выбора ряда и места при изменении выбранной сессии
      sessionSelect.addEventListener('change', updateSeatOptions);
    }
  
    
    function updateSeatOptions() {
      
  
    // ...
  });
  