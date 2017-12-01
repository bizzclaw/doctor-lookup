import { Doctor } from "./../js/doctor.js";

$(document).ready(function() {

	let loadConditions = new Promise((resolve, reject) => {
		Doctor.GetConditions(function(response) {
			resolve(response);
		});
	});

	loadConditions.then((response) => {
		console.log(response);
	});
});
