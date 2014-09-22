"use strict";

app.controller('DialogCtrl', [ '$rootScope', function ($rootScope) {
	//Save reference to controller in order to avoid reference soup
	var Dialog = this;

	Dialog.openFormularDialog = function(){
		console.log('openFormularDialog')
	}

	Dialog.closeDialog = function(){
		if($rootScope.dialog != ''){
			$rootScope.dialog = '';
		}
	}

}]);