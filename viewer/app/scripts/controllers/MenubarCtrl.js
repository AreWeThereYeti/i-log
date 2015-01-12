"use strict";

app.controller('MenubarCtrl', ['$rootScope', function ($rootScope) {
	//Save reference to controller in order to avoid reference soup
	var Menubar = this;

	Menubar.createReport = function () {
		if($rootScope.dialog == 'create report'){
			$rootScope.dialog = '';
		}
		else{
			$rootScope.dialog = 'create report';
		}
	};

	Menubar.openError = function () {
		if($rootScope.dialog == 'error'){
			$rootScope.dialog = '';
		}
		else{
			$rootScope.dialog = 'error';
		}
	};

	//Test variable. If you see it when the app runs you are good to go
	Menubar.testVar = 'This is data from the menubar!';
}]);