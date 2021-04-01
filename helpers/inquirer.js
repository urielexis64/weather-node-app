require("colors");
const inquirer = require("inquirer");

const menuOptions = [
	{
		type: "list",
		name: "option",
		message: "What do you want to do?",
		choices: [
			{
				value: 1,
				name: `${"1.".green} Search city`,
			},
			{
				value: 2,
				name: `${"2.".green} History`,
			},
			{
				value: 0,
				name: `${"0.".green} Exit\n`,
			},
		],
	},
];

const inquirerMenu = async () => {
	console.log("=====================".green);
	console.log("   Select an option".white);
	console.log("=====================\n".green);

	const {option} = await inquirer.prompt(menuOptions);
	return option;
};

const pause = async () => {
	const question = [
		{
			type: "input",
			name: "pause",
			message: `Press ${"ENTER".green} to continue...`,
		},
	];
	console.log("\n");
	await inquirer.prompt(question);
};

const readInput = async (message) => {
	const question = [
		{
			type: "input",
			name: "outputValue",
			message,
			validate(value) {
				if (value.length === 0) {
					return "Please enter a value.";
				}
				return true;
			},
		},
	];
	const {outputValue} = await inquirer.prompt(question);
	return outputValue;
};

const listPlaces = async (places = []) => {
	const choices = places.map((place, index) => {
		const idx = `${index + 1}.`.green;
		return {
			value: place.id,
			name: `${idx} ${place.name}`,
		};
	});

	choices.unshift({
		value: 0,
		name: "0.".green + " Cancel",
	});

	const question = [
		{
			type: "list",
			name: "id",
			message: "Select a place...",
			choices,
		},
	];

	const {id} = await inquirer.prompt(question);
	return id;
};

const confirm = async (message) => {
	const question = [
		{
			type: "confirm",
			name: "ok",
			message,
		},
	];

	const {ok} = await inquirer.prompt(question);
	return ok;
};

module.exports = {
	inquirerMenu,
	pause,
	readInput,
	listPlaces,
	confirm,
};
