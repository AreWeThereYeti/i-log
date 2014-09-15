"use strict";

app.controller('RapportOverviewCtrl', [ '$location',function ($location) {
	//Save reference to controller in order to avoid reference soup
	var RapportOverview = this;

	RapportOverview.setRoute = function(route){
		$location.path(route);
		console.log('changing route to : ' + route);
	};

	//Test variable. If you see it when the app runs you are good to go
	RapportOverview.testVar = 'We are up and running  on rapports overview -page!';
	RapportOverview.testid = 24;
}]);