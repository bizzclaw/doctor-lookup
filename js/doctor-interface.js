import { Doctor } from "./../js/doctor.js";
import { Location } from "./../js/location.js";

$(document).ready(function() {

	let conditionPage = 0;
	let resultsPanel = $("#conditions-results");
	let selectedCondition;
	let userPosStr;

	let loadPosition = new Promise((resolve, reject) => {
		Location.GetClientLocation(function(userPos) {
			console.log(userPos);
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

				let city = Location.Find(0); // just use portland for now

				let loadDoctors = new Promise((resolve, reject) => {
					Doctor.FindDoctors(uid, userPosStr, city, function(response) {
						resolve(response);
					});
				});

				loadDoctors.then((response) => {
					// response.data. 
				});
			});

			$("#pagecount").text(conditionPage + 1);
			return true;
		});
	};
});
