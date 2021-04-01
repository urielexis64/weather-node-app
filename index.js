require("dotenv").config();

const {inquirerMenu, pause, readInput} = require("./helpers/inquirer");
const Searches = require("./models/searches");

const main = async () => {
	const searches = new Searches();
	let opt;

	do {
		console.clear();

		opt = await inquirerMenu();
		switch (opt) {
			case 1:
				const city = await readInput("Enter a city: ");
				await searches.searchCity(city);
				break;
			case 2:
				///TODO: show history
				break;
			case 0:
				break;
			default:
		}
		if (opt !== 0) await pause();
	} while (opt !== 0);
};

main();
