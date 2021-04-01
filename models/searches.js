const axios = require("axios");

class Searches {
	history = ["Mexico", "Espana", "Culiacan"];

	constructor() {
		//TODO: read DB
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
}

module.exports = Searches;
