"use strict";

app.controller('MenubarCtrl', [ function () {
	//Save reference to controller in order to avoid reference soup
	var Menubar = this;

	//Test variable. If you see it when the app runs you are good to go
	Menubar.testVar = 'This is data from the menubar!';
}]);