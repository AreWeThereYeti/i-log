"use strict";

app.controller('FilterbarCtrl', ['$scope', function ($scope) {
	//Save reference to controller in order to avoid reference soup
	var Filterbar = this;

  Filterbar.changeRange = function(range){
    $scope.$parent.changeRange(range);
  };
  //$scope.$parent.filterValue = ;


	//Test variable. If you see it when the app runs you are good to go
	Filterbar.testVar = 'This is data from the menubar!';
}]);