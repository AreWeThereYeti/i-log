"use strict";

app.controller('RapportOverviewCtrl', [ '$location',function ($location) {
	//Save reference to controller in order to avoid reference soup
	var RapportOverview = this;

	//Test variable. If you see it when the app runs you are good to go
	RapportOverview.testVar = 'We are up and running  on rapports overview -page!';
	RapportOverview.testid = 24;
}]);