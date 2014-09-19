"use strict";

app.controller('DatePickerCtrl', ['$scope' ,function ($scope) {
	//Save reference to controller in order to avoid reference soup

	$scope.data = "not clicked";
	$scope.year = [2014, 2015, 2016];
	$scope.month = ['Januar', 'Februar', 'Marts'];
	$scope.day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

}]);