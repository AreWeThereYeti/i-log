"use strict";

app.controller('LogsOverviewCtrl', [ '$location', function ($location) {
	//Save reference to controller in order to avoid reference soup
	var LogsOverview = this;

	//Test variable. If you see it when the app runs you are good to go
	LogsOverview.id = 32;
}]);