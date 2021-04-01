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
				if (placeId === 0) break;

				const {name, lat, lng} = places.find((place) => place.id === placeId);

				// * Weather
				const {desc, temp, min, max} = await searches.placeWeather(lat, lng);

				// * All results
				console.clear();
				console.log("\nPlace info\n".bgGreen.white);
				console.log("Place: ", name.yellow);
				console.log("Latitude: ", lat);
				console.log("Longitude: ", lng);
				console.log("Temperature: ", temp);
				console.log("Min: ", min);
				console.log("Max: ", max);
				console.log("Description: ", desc.yellow);

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
