import { Doctor } from "./../js/doctor.js";
import { Location } from "./../js/location.js";

$(document).ready(function() {

	let conditionPage = 0;
	let resultsPanel = $("#conditions-results");
	let selectedCondition;
	let userPosStr;
	let city = Location.Find(0); // just use portland for now

	let loadPosition = new Promise((resolve, reject) => {
		Location.GetClientLocation(function(userPos) {
			resolve(userPos);
		});
	});

	loadPosition.then((userPos) => {
		userPosStr = userPos;

		fillConditions(0);

		$(".page-select").click(function() {
			$(".page-select").addClass("disabled", "1");
			conditionPage = Math.max(conditionPage + parseInt($(this).attr("pagedir")),0);
			fillConditions(conditionPage);
		});
	});

	function fillDoctors(response) {
		$("#doctor-list").empty();

		if (!response || !response.data || response.data.length <= 0) {
			let errorMessage = response ? "No Doctors Found" : "Server Error"
			$("#doctor-list").append(`<h1 class="error">${errorMessage}</h1>`);
			return false;
		}

		for (var i = 0; i < response.data.length; i++) {
			let doctor = response.data[i];
			let doctorName = doctor.profile.first_name + " " + doctor.profile.last_name;
			$("#doctor-list").append(`<p class="panel-button doctor-button" doctorid="${i}">${doctorName}</p>`);
		}
		$(".doctor-button").click(function() {

			$("#doctor-bio").empty()
			$("#doctor-details").empty()

			let doctor = response.data[$(this).attr("doctorid")]

			$("#doctor-bio").append("<h1>" + doctor.profile.first_name + " " + doctor.profile.last_name + "</h1>");
			$("#doctor-bio").append("<p>" + doctor.profile.bio + "</p>");

			$("#doctor-details").append(`<img class="doctor-img" src = "` + doctor.profile.image_url + `">`);
			var closest;
			doctor.practices.forEach(function(practice) {
				let distance = practice.distance;
				closest = closest ? closest < distance ? distance : closest : distance; // just find the closest darn practice.
			});
			$("#doctor-details").append("<h3>Distance: " + Math.floor(closest) + "</h3>"); // I have no idea what better distance unit of measurement is. Kilometers? Miles? can't find any documentation

			$("#doctor-search").fadeOut(500);
			setTimeout(function() {
				$("#doctor-info").fadeIn(500);
			}, 500);
		});
	}

	$("#name-search").click(function() {
		$(".condition-available").removeClass("selected");
		let loadDoctors = new Promise((resolve, reject) => {
			Doctor.FindDoctors("name", $("#name-input").val(), userPosStr, city, function(response) {
				resolve(response);
			});
		});

		loadDoctors.then((response) => {
			fillDoctors(response);
		});
	});


	function fillConditions(page) {
		let loadConditions = new Promise((resolve, reject) => {
			Doctor.GetConditions(page, function(response) {
				resolve(response);
			});
		});

		loadConditions.then((response) => {
			$(".page-select").removeClass("disabled");
			if (!response.data || response.data.length < 1) {
				conditionPage -= 1;
				return false;
			}

			resultsPanel.empty();

			response.data.forEach(function(condition) {
				resultsPanel.append(`<p class="panel-button condition-available ${selectedCondition === condition.uid ? "selected" : ""}" uid=${condition.uid}>${condition.name}</p>`);
			});

			$(".condition-available").click(function() {
				let button = $(this);
				let select = !button.hasClass("selected");
				$(".condition-available").removeClass("selected");
				button.toggleClass("selected");
				let uid = button.attr("uid");
				selectedCondition = uid;

				let loadDoctors = new Promise((resolve, reject) => {
					Doctor.FindDoctors("query",uid, userPosStr, city, function(response) {
						resolve(response);
					});
				});

				loadDoctors.then((response) => {
					fillDoctors(response);
				});
			});

			$("#pagecount").text(conditionPage + 1);
			return true;
		});
	};

	$("#doctor-back").click(function() {
		$("#doctor-info").fadeOut(500);
		setTimeout(function() {
			$("#doctor-search").fadeIn(500);
		}, 500);
	});
});
