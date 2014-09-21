"use strict";

app.controller('MenubarCtrl', ['ngDialog', function (ngDialog) {
	//Save reference to controller in order to avoid reference soup
	var Menubar = this;

	Menubar.clickToOpen = function () {
		ngDialog.open({
			template: 'scripts/templates/dialog.html'
		});
	};

	//Test variable. If you see it when the app runs you are good to go
	Menubar.testVar = 'This is data from the menubar!';
}]);