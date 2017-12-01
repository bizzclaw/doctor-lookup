const API = require("./../.env");
const BDKEY = API.betterDoctor;

import { Location } from "./../js/location.js";
import { Symptom } from "./../js/symptom.js";

export class Doctor {

	static FindDoctors(location, callback, radius = 200, limit = 10) {
		let locationStr = Location.GetSearchLocation(location);
		location.GetClientLocation(locationStr, function(userPosStr) {
			locationStr += ", " + radius; // concat the radius after we've already used the center pos as a fallback
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
