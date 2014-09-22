"use strict";

app.controller('RapportCtrl', ['report', function (report) {
	//Save reference to controller in order to avoid reference soup
	var Rapport = this;

	Rapport.data = {
		"regions": ["Federal", "Tigray", "Afar", "Amhara", "Oromia", "Gambella", "Addis Ababa"],
		"institutions": [0, 5, 34, 99, 21, 0, 3]
	};

	Rapport.piedata = [
		{
			"label": "Den første",
			"value": 5
		}, {
			"label": "Awesome",
			"value": 20
		}, {
			"label": "Awesome",
			"value": 10
		}, {
			"label": "Nummer",
			"value": 40
		}, {
			"label": "AwesomeAwesomeAwesome",
			"value": 5
		}, {
			"label": "AwesomeAwesome",
			"value": 20
		}
	];

	Rapport.linedata = [

	];

	//Test variable. If you see it when the app runs you are good to go
	Rapport.testVar = 'We are up and running  on rapports overview -page!';
}]);