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
				console.log("loading...");
				const places = await searches.searchCity(term);
				console.clear();

				// * Select place
				const placeId = await listPlaces(places);
				if (placeId === 0) continue;

				const {name, lat, lng} = places.find((place) => place.id === placeId);

				searches.addHistory(name);
				// * Weather
				console.log("loading...");
				const {desc, temp, min, max} = await searches.placeWeather(lat, lng);

				// * All results
				console.clear();
				console.log("\n  Place info  \n".bgYellow.black);
				console.log("Place: ", name.yellow);
				console.log("Latitude: ", lat);
				console.log("Longitude: ", lng);
				console.log("Temperature: ", temp, "°C");
				console.log("Min: ", min, "°C");
				console.log("Max: ", max, "°C");
				console.log("Description: ", desc.yellow);

				break;
			case 2:
				searches.history.forEach((place, index) => {
					const idx = `${index + 1}.`.green;
					console.log(`${idx} ${place}`);
				});
				break;
			default:
		}
		if (opt !== 0) await pause();
	} while (opt !== 0);
};

main();
