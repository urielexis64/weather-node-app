require("dotenv").config();

const {inquirerMenu, pause, readInput, listPlaces} = require("./helpers/inquirer");
const Searches = require("./models/searches");

const main = async () => {
	const searches = new Searches();
	let opt;

	do {
		console.clear();

		opt = await inquirerMenu();
		switch (opt) {
			case 1:
				// * Show prompt message
				const term = await readInput("Enter a city: ");

				// * Search places
				const places = await searches.searchCity(term);

				// * Select place
				const placeId = await listPlaces(places);
				const selectedPlace = places.find((place) => place.id === placeId);
				// * Weather

				// * All results
				console.log("Place info\n".green);
				console.log("Place: ", selectedPlace.name);
				console.log("Latitude: ", selectedPlace.lat);
				console.log("Longitude: ", selectedPlace.lng);
				console.log("Temperature: ");
				console.log("Min: ");
				console.log("Max: ");

				break;
			case 2:
				///TODO: show history
				break;
			default:
		}
		if (opt !== 0) await pause();
	} while (opt !== 0);
};

main();
