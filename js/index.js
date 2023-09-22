const dayWeekList = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

function setDayAndWeekElements(today) {
	const dayNumberElements = document.querySelectorAll(".page-nav__day-number");
	const dayWeekElements = document.querySelectorAll(".page-nav__day-week");

	dayNumberElements.forEach((dayNumberElement, i) => {
		const day = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
		const timestamp = Math.trunc(day / 1000);

		dayNumberElement.innerHTML = `${day.getDate()},`;
		dayWeekElements[i].innerHTML = dayWeekList[day.getDay()];

		const link = dayNumberElement.parentNode;
		link.dataset.timeStamp = timestamp;

		link.classList.toggle('page-nav__day_weekend', dayWeekElements[i].innerHTML === 'Вс' || dayWeekElements[i].innerHTML === 'Сб');
	});
}

function handleApiResponse(resp) {
	const data = {
		seances: resp.seances.result,
		films: resp.films.result,
		halls: resp.halls.result.filter(hall => hall.hall_open == 1)
	};

	const main = document.querySelector("main");

	data.films.forEach((film) => {
		let seancesHTML = '';
		const filmId = film.film_id;

		data.halls.forEach((hall) => {
			const seances = data.seances.filter((seance) => ((seance.seance_hallid == hall.hall_id) && (seance.seance_filmid == filmId)));

			if (seances.length > 0) {
				seancesHTML += `
                    <div class="movie-seances__hall">
                        <h3 class="movie-seances__hall-title">${hall.hall_name}</h3>
                        <ul class="movie-seances__list">`;

				seances.forEach((seance) => {
					seancesHTML += `<li class="movie-seances__time-block">
                        <a class="movie-seances__time" href="hall.html" 
                            data-film-name="${film.film_name}" data-film-id="${film.film_id}" 
                            data-hall-id="${hall.hall_id}" data-hall-name="${hall.hall_name}" 
                            data-price-vip="${hall.hall_price_vip}" data-price-standart="${hall.hall_price_standart}" 
                            data-seance-id="${seance.seance_id}" data-seance-start="${seance.seance_start}" 
                            data-seance-time="${seance.seance_time}">
                            ${seance.seance_time}
                        </a>
                    </li>`;
				});

				seancesHTML += `
                        </ul>
                    </div>`;
			}
		});

		if (seancesHTML) {
			main.innerHTML += `
                <section class="movie">
                    <div class="movie__info">
                        <div class="movie__poster">
                            <img class="movie__poster-image" alt="Звёздные войны постер" src="${film.film_poster}">
                        </div>
                        <div class="movie__description">
                            <h2 class="movie__title">${film.film_name}</h2>
                            <p class="movie__synopsis">${film.film_description}</p>
                            <p class="movie__data">
                                <span class="movie__data-duration">${film.film_duration} мин.</span>
                                <span class="movie__data-origin">${film.film_origin}</span>
                            </p>
                        </div>
                    </div>
                    ${seancesHTML}
                </section>`;
		}
	});

	const dayLinks = Array.from(document.querySelectorAll(".page-nav__day"));
	const movieSeances = Array.from(document.querySelectorAll(".movie-seances__time"));

	const getTimeStampDay = (event) => {
		let timeStampDay = Number(event.target.dataset.timeStamp);
		if (isNaN(timeStampDay)) {
			timeStampDay = Number(event.target.closest(".page-nav__day").dataset.timeStamp);
		}
		return timeStampDay;
	};

	const updateSeances = (timeStampDay) => {
		movieSeances.forEach((movieSeance) => {
			const timeStampSeanceDay = Number(movieSeance.dataset.seanceStart) * 60;
			const timeStampSeance = timeStampDay + timeStampSeanceDay;
			const timeStampNow = Math.trunc(+new Date() / 1000);
			movieSeance.dataset.seanceTimeStamp = timeStampSeance;
			movieSeance.classList.toggle(
				"acceptin-button-disabled",
				timeStampSeance - timeStampNow <= 0
			);
		});
	};

	dayLinks.forEach((dayLink) =>
		dayLink.addEventListener("click", (event) => {
			event.preventDefault();
			document.querySelector(".page-nav__day_chosen").classList.remove("page-nav__day_chosen");
			dayLink.classList.add("page-nav__day_chosen");
			const timeStampDay = getTimeStampDay(event);
			updateSeances(timeStampDay);
		})
	);

	dayLinks[0].click();

	movieSeances.forEach((movieSeance) =>
		movieSeance.addEventListener("click", (event) => {
			const {
				hallId
			} = event.target.dataset;
			const selectSeanse = {
				...event.target.dataset,
				hallConfig: data.halls.find((hall) => hall.hall_id == hallId).hall_config,
			};
			localStorage.clear();
			localStorage.setItem("selectSeanse", JSON.stringify(selectSeanse));
		})
	);
}

document.addEventListener("DOMContentLoaded", () => {
	const today = new Date();
	today.setHours(0, 0, 0);

	setDayAndWeekElements(today);

	api({
		url: "https://jscp-diplom.netoserver.ru/",
		params: "event=update",
		callback: handleApiResponse
	});
});
