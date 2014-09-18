"use strict";

app.controller('RapportCtrl', ['report', 'ngDialog', function (report, ngDialog) {
	//Save reference to controller in order to avoid reference soup
	var Rapport = this;

	Rapport.clickToOpen = function () {
		console.log('click to open')
		ngDialog.open({
			template: 'scripts/templates/dialog.html',
			controller : 'DialogCtrl'
		});
	};

	Rapport.data = {
		"regions": ["Federal", "Tigray", "Afar", "Amhara", "Oromia", "Gambella", "Addis Ababa", "Dire Dawa", "Harar", "Benishangul-Gumuz", "Somali", "SNNPR "],
		"institutions": [0, 0, 34, 421, 738, 0, 218, 22, 22, 109, 0, 456]
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