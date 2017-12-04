import { Doctor } from "./../js/doctor.js";

$(document).ready(function() {

	let conditionPage = 0
	let resultsPanel = $("#conditions-results")

	let fillConditions = function(page) {
		let loadConditions = new Promise((resolve, reject) => {
			Doctor.GetConditions(page, function(response) {
				resolve(response);
			});
		});

		loadConditions.then((response) => {
			$(".page-select").removeClass("disabled");
			if (!response.data || response.data.length < 1) {
				conditionPage -= 1;
				return false
			}

			resultsPanel.empty();

			response.data.forEach(function(condition) {
				resultsPanel.append(`<p class="condition-list condition-available" uid=`+ condition.uid +`>` + condition.name + `</p>`);
			});

			$("condition-available").click(function() {

			});

			$("#pagecount").text(conditionPage + 1);
			return true
		});
	}

	fillConditions(0)

	$(".page-select").click(function() {
		$(".page-select").addClass("disabled", "1");
		conditionPage = Math.max(conditionPage + parseInt($(this).attr("pagedir")),0);
		fillConditions(conditionPage)
	});
});
