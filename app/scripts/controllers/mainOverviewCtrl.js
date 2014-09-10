"use strict";

app.controller('MainOverviewCtrl', [function () {
	//Save reference to controller in order to avoid reference soup
	var MainOverviewCtrl = this;

	//Test variable. If you see it when the app runs you are good to go
	MainOverviewCtrl.testVar = 'We are up and running !';
}]);