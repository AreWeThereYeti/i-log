"use strict";

app.controller('RapportCtrl', ['reports', function (report) {
	//Save reference to controller in order to avoid reference soup
	var Rapport = this;

	//Test variable. If you see it when the app runs you are good to go
	Rapport.testVar = 'We are up and running  on rapports overview -page!';
}]);