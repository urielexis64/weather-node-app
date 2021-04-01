const fs = require("fs");

const axios = require("axios");
class Searches {
	history = [];
	dbPath = "./db/database.json";

	constructor() {
		this.readDB();
	}

	get mapboxParams() {
		return {
			access_token: process.env.MAPBOX_KEY || "",
			limit: 5,
			language: "es",
		};
	}

	get weatherParams() {
		return {
			appid: process.env.OPENWEATHER_KEY || "",
			units: "metric",
			lang: "es",
		};
	}

	async searchCity(city = "") {
		// http request
		try {
			const instance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
				params: this.mapboxParams,
			});
			const resp = await instance.get();

			return resp.data.features.map((city) => ({
				id: city.id,
				name: city.place_name,
				lng: city.center[0],
				lat: city.center[1],
			}));
		} catch (error) {
			return [];
		}
	}

	async placeWeather(lat, lon) {
		try {
			const instance = axios.create({
				baseURL: `https://api.openweathermap.org/data/2.5/weather`,
				params: {...this.weatherParams, lat, lon},
			});
			const resp = await instance.get();
			const {weather, main} = resp.data;

			return {
				desc: weather[0].description,
				temp: main.temp,
				min: main.temp_min,
				max: main.temp_max,
			};
		} catch (error) {
			return [];
		}
	}

	addHistory(place = "") {
		if (this.history.includes(place)) return;

		this.history = this.history.splice(0, 5);
		this.history.unshift(place);
		this.saveOnDB();
	}

	saveOnDB() {
		const payload = {
			history: this.history,
		};
		fs.writeFileSync(this.dbPath, JSON.stringify(payload));
	}

	readDB() {
		if (fs.existsSync(this.dbPath)) {
			const localData = fs.readFileSync(this.dbPath, {encoding: "utf-8"});
			const data = JSON.parse(localData);
			this.history = data.history;
		}
	}
}

module.exports = Searches;
