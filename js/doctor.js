const API = require("./../.env");
const BDKEY = API.betterDoctor;

export class Doctor {

	static FindDoctors(location, radius, callback, limit = 10) {
		let locationStr = Location.GetSearchLocation(location)
		location.GetClientLocation(function(userPosStr) {
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
