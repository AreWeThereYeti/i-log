"use strict";

app.controller('MainCtrl', [ '$location', '$rootScope', function ($location, $rootScope) {
	//Save reference to controller in order to avoid reference soup
	var Main = this;

	//Test variable. If you see it when the app runs you are good to go
	Main.testVar = 'Main Ctrl!';

  Main.fontFamily = $rootScope.fontFamily;
}]);