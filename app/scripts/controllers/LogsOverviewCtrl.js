"use strict";

app.controller('LogsOverviewCtrl', [function () {
	//Save reference to controller in order to avoid reference soup
	var LogsOverview = this;
	//Test variable. If you see it when the app runs you are good to go
	LogsOverview.testVar = 'We are up and running  on LogOverview page!';
}]);