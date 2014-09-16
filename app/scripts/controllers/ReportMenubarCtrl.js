"use strict";

app.controller('ReportMenubarCtrl', [ function () {
	//Save reference to controller in order to avoid reference soup
	var ReportMenubar = this;

	//Test variable. If you see it when the app runs you are good to go
	ReportMenubar.testVar = 'This is data from the menubar!';
}]);