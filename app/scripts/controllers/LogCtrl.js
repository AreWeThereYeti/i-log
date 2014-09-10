"use strict";

app.controller('LogCtrl', [function () {
	//Save reference to controller in order to avoid reference soup
	var Log = this;
	//Test variable. If you see it when the app runs you are good to go
	Log.testVar = 'We are up and running  on Log - page!';
}]);