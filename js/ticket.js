function generateTicket() {
	const selectSeanse = JSON.parse(localStorage.selectSeanse);
	const salesPlaces = selectSeanse.salesPlaces;

	const places = salesPlaces.map(element => `${element.row}/${element.place}`).join(", ");

	const formatDate = (date) => {
		return date.toLocaleDateString("ru-RU", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric"
		});
	};

	const date = new Date(Number(`${selectSeanse.seanceTimeStamp}000`));
	const dateStr = formatDate(date);

	const textQR = `Фильм: ${selectSeanse.filmName} Зал: ${selectSeanse.hallName} Ряд/Место: ${places} Дата: ${dateStr} Начало сеанса: ${selectSeanse.seanceTime} Билет действителен строго на свой сеанс`;

	const qrcode = QRCreator(textQR, {
		image: "SVG"
	});

	qrcode.download();

	document.querySelector(".ticket__info-qr").append(qrcode.result);

	document.querySelector(".ticket__title").innerHTML = selectSeanse.filmName;
	document.querySelector(".ticket__chairs").innerHTML = places;
	document.querySelector(".ticket__hall").innerHTML = selectSeanse.hallName;
	document.querySelector(".ticket__start").innerHTML = selectSeanse.seanceTime;
}

document.addEventListener("DOMContentLoaded", generateTicket);
