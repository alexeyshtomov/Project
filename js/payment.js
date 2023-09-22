function payment(salesPlaces, priceStandart, priceVip) {
    let places = "";
    let price = 0;

    for (const {row, place, type} of salesPlaces) {
        if (places !== "") {
            places += ", ";
        }
        places += `${row}/${place}`;
        price += type === "standart" ? Number(priceStandart) : Number(priceVip);
    }

    return {places, price};
}

function updateTicketInformation(selectSeanse, places, price) {
    document.querySelector(".ticket__title").innerHTML = selectSeanse.filmName;
    document.querySelector(".ticket__chairs").innerHTML = places;
    document.querySelector(".ticket__hall").innerHTML = selectSeanse.hallName;
    document.querySelector(".ticket__start").innerHTML = selectSeanse.seanceTime;
    document.querySelector(".ticket__cost").innerHTML = price;
}

function handleAcceptButtonClick(selectSeanse, newHallConfig) {
    document.querySelector(".acceptin-button").addEventListener("click", (event) => {
        event.preventDefault();
        fetch("https://jscp-diplom.netoserver.ru/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `event=sale_add&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}&hallConfiguration=${newHallConfig}`,
        });
    });
}

const selectSeanse = JSON.parse(localStorage.selectSeanse);
const {
    places,
    price
} = payment(selectSeanse.salesPlaces, selectSeanse.priceStandart, selectSeanse.priceVip);
updateTicketInformation(selectSeanse, places, price);
const newHallConfig = selectSeanse.hallConfig.replace(/selected/g, "taken");
handleAcceptButtonClick(selectSeanse, newHallConfig);
