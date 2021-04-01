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
}

module.exports = Searches;
