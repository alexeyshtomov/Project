document.addEventListener("DOMContentLoaded", () => {
	const selectSeanse = JSON.parse(localStorage.selectSeanse);
	const buttonAcceptin = document.querySelector('.acceptin-button');
	const buyingInfoTitle = document.querySelector('.buying__info-title');
	const buyingInfoStart = document.querySelector('.buying__info-start');
	const buyingInfoHall = document.querySelector('.buying__info-hall');
	const priceStandart = document.querySelector('.price-standart');
	const confStepWrapper = document.querySelector('.conf-step__wrapper');

	function updateInfo() {
		buyingInfoTitle.innerHTML = selectSeanse.filmName;
		buyingInfoStart.innerHTML = `Начало сеанса ${selectSeanse.seanceTime}`;
		buyingInfoHall.innerHTML = selectSeanse.hallName;
		priceStandart.innerHTML = selectSeanse.priceStandart;
	}

	function handleChairClick(event) {
		if (event.target.classList.contains('conf-step__chair_taken')) {
			return;
		}
		event.target.classList.toggle('conf-step__chair_selected');
		const chairsSelected = [...document.querySelectorAll('.conf-step__row .conf-step__chair_selected')];
		buttonAcceptin.disabled = !chairsSelected.length;
	}

	function gatherSelectedPlaces() {
		const selectedPlaces = [];
		const divRows = Array.from(document.getElementsByClassName("conf-step__row"));
		divRows.forEach((row, i) => {
			const spanPlaces = Array.from(row.getElementsByClassName("conf-step__chair"));
			spanPlaces.forEach((place, j) => {
				if (place.classList.contains("conf-step__chair_selected")) {
					const typePlace = place.classList.contains("conf-step__chair_standart") ? "standart" : "vip";
					selectedPlaces.push({
						"row": i + 1,
						"place": j + 1,
						"type": typePlace
					});
				}
			});
		});
		return selectedPlaces;
	}

	function handleAcceptButtonClick(event) {
		event.preventDefault();
		const selectedPlaces = gatherSelectedPlaces();
		const configurationHall = confStepWrapper.innerHTML;
		selectSeanse.hallConfig = configurationHall;
		selectSeanse.salesPlaces = selectedPlaces;
		localStorage.clear();
		localStorage.setItem('selectSeanse', JSON.stringify(selectSeanse));
		const link = document.createElement('a');
		link.href = "payment.html";
		link.click();
	}

	function loadHallConfig() {
		const params = `event=get_hallConfig&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}`;
		api({
			url: "https://jscp-diplom.netoserver.ru/",
			params,
			callback: (resp) => {
				if (resp) {
					selectSeanse.hallConfig = resp;
				}
				confStepWrapper.innerHTML = selectSeanse.hallConfig;
				const chairs = [...document.querySelectorAll('.conf-step__row .conf-step__chair')];
				chairs.forEach(chair => chair.addEventListener('click', handleChairClick));
			}
		});
	}

	updateInfo();
	loadHallConfig();
	buttonAcceptin.addEventListener("click", handleAcceptButtonClick);
});
