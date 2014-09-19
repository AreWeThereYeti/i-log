"use strict";

app.controller('DatePickerCtrl', ['$scope', '$filter' ,function ($scope, $filter) {
//	Ctrl uses scope in order to use it in directive
	$scope.data = "not clicked";
	$scope.year = [2014, 2015, 2016];
	$scope.month = [{
		val : 1,
		month :'Januar'
	},
		{
			val : 2,
			month :'Februar'
		},
		{
			val : 3,
			month :'Marts'
		}
	];
	$scope.day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

	if(angular.isDefined($scope.fromYear && $scope.fromMonth && $scope.fromDay)){
		$scope.dateFrom =  new Date(($scope.fromYear + '-' + $scope.fromMonth.val + '-' + $scope.fromDay)).getTime();
	}

	if(angular.isDefined($scope.toYear && $scope.toMonth && $scope.toDay)){
		$scope.dateTo =  new Date(($scope.toYear + '-' + $scope.toMonth.val + '-' + $scope.toDay)).getTime();
	}

	$scope.data = 'not working yet'
	if(angular.isDefined($scope.dateTo && $scope.dateFrom)){
		$scope.data = $scope.dateTo + ' and ' + $scope.dateFrom;
	}
	$scope.createReport = function(){
		if(angular.isDefined($scope.dateTo && $scope.dateFrom)){
			$scope.data = $scope.dateTo + ' and ' + $scope.dateFrom
//		Create Report
		}
	}



}]);