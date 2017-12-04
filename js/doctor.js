const API = require("./../.env");
const BDKEY = API.betterDoctor;
const RESULTSPERPAGE = 20

import { Location } from "./../js/location.js";

let _conditionsCache = []

export class Doctor {


	static GetConditions(page, callback) {
		if (_conditionsCache[page]) {
			callback(_conditionsCache[page]); // callback with cached result instead of wasting api calls.
			return true;
		}
		let skip = RESULTSPERPAGE * page;
		let limit = RESULTSPERPAGE;
		$.ajax({
			url: `https://api.betterdoctor.com/2016-03-01/conditions?skip=${skip}&limit=${limit}&user_key=${BDKEY}`,
			type: "GET",
			data: {
				format: "json"
			},
			success: function(response) {
				_conditionsCache[page] = response;
				callback(response);
			},
			error: function(error) {
				callback(false, error);
			}
		});
		return false;
	}

	static FindDoctors(location, callback, radius = 200, limit = 10) {
		let locationStr = Location.GetSearchLocation(location);
		location.GetClientLocation(locationStr, function(userPosStr) {
			locationStr += ", " + radius; // concat the radius after we've already used the center pos as a fallback
			console.log(locationStr);
			$.ajax({
				url: `https://api.betterdoctor.com/2016-03-01/doctors?location=${locationStr}&user_location=${userPosStr}&skip=0&limit=${limit}&user_key=${BDKEY}`,
				type: "GET",
				data: {
					format: "json"
				},
				success: function(response) {
					callback(response);
				},
				error: function(error) {
					callback(false, error);
				}
			});
		});
	}
}
