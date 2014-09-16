"use strict";

app.controller('RapportCtrl', ['report', function (report) {
	//Save reference to controller in order to avoid reference soup
	var Rapport = this;

	Rapport.bardata = [
		{name: "Greg", score: 98},
		{name: "Ari", score: 96},
		{name: 'Q', score: 75},
		{name: "Loser", score: 48}
	];

	Rapport.piedata = [
		{
			"label": "Den første",
			"value": 5
		}, {
			"label": "Awesome",
			"value": 20
		}, {
			"label": "Awesome 3",
			"value": 10
		}, {
			"label": "Nummer 4",
			"value": 40
		}, {
			"label": "AwesomeAwesomeAwesome 5",
			"value": 5
		}, {
			"label": "AwesomeAwesome 6",
			"value": 20
		}
	]

	//Test variable. If you see it when the app runs you are good to go
	Rapport.testVar = 'We are up and running  on rapports overview -page!';
}]);