"use strict";

app.controller('RapportCtrl', ['report', function (report) {
	//Save reference to controller in order to avoid reference soup
	var Rapport = this;

	Rapport.data = [
		{
			"letter": "A",
			"frequency": 5
		}, {
			"letter": "B",
			"frequency": 20
		}, {
			"letter": "C",
			"frequency": 10
		}, {
			"letter": "D",
			"frequency": 40
		}, {
			"letter": "E",
			"frequency": 5
		}, {
			"letter": "F",
			"frequency": 20
		}
	];

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