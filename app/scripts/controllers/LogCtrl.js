"use strict";

app.controller('LogCtrl', [ 'logs', '$routeParams', function (logs, $routeParams) {
	//Save reference to controller in order to avoid reference soup
	var Log = this;

	Log.test = logs.data.inputs;
	Log.route = $routeParams.id;
	//Test variable. If you see it when the app runs you are good to go
	Log.testVar = 'We are up and running  on Log - page!';
}]);