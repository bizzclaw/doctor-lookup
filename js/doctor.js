const ENV = require("./../.env");
const APIKEY = ENV.apiKey;
const RESULTSPERPAGE = 20;

import { Location } from "./../js/location.js";

let _conditionsCache = [];
let _doctorCache = {};
let _lastApiCall = 0;
export class Doctor {


	static GetConditions(page, callback) {

		if (_conditionsCache[page]) {
			// callback with cached result instead of wasting api calls.
			callback(_conditionsCache[page]);
			return true;
		}

		let now = performance.now()
		// ideally you'd want to tie something like this to a particular user/IP address, or put it in a que but it's clientside so whatever
		if (now < _lastApiCall + 0.5) {
			return false;
		}
		_lastApiCall = now;

		$.ajax({
			url: `https://api.betterdoctor.com/2016-03-01/conditions?skip=${RESULTSPERPAGE * page}&limit=${RESULTSPERPAGE}&user_key=${APIKEY}`,
			type: "GET",
			data: {
				format: "json"
			},
			success: function(response) {
				// memory is cheaper than API calls
				_conditionsCache[page] = response;
				callback(response);
			},
			error: function(error) {
				callback(false, error);
			}
		});
		return false;
	}

	static FindDoctors(location, conditionUid, callback, radius = 200, limit = 10) {
		let cached = _doctorCache[conditionUid]
		if (cached) {
			callback(cached)
			return true
		}

		let locationStr = Location.GetSearchLocation(location);
		location.GetClientLocation(locationStr, function(userPosStr) {
			// concat the radius after we've already used the center pos as a fallback
			locationStr += ", " + radius;
			console.log(locationStr);
			$.ajax({
				url: `https://api.betterdoctor.com/2016-03-01/doctors?location=${locationStr}&query=${conditionUid}&user_location=${userPosStr}&skip=0&limit=${limit}&user_key=${APIKEY}`,
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
