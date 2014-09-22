"use strict";

app.controller('DatePickerCtrl', ['$scope','DateService' ,function ($scope, DateService) {
//	Ctrl uses scope in order to use it in directive
	$scope.year = DateService.year;
	$scope.month = DateService.month;
	$scope.day = DateService.day;

	$scope.createReport = function(){
		if(angular.isDefined($scope.fromYear && $scope.fromMonth && $scope.fromDay)){
			$scope.dateFrom =  new Date(($scope.fromYear + '-' + $scope.fromMonth.val + '-' + $scope.fromDay)).getTime();
		}

		if(angular.isDefined($scope.toYear && $scope.toMonth && $scope.toDay)){
			$scope.dateTo =  new Date(($scope.toYear + '-' + $scope.toMonth.val + '-' + $scope.toDay)).getTime();
		}

		if(angular.isDefined($scope.dateTo && $scope.dateFrom)){
			$scope.data = $scope.dateTo + ' and ' + $scope.dateFrom;
		}

	}



}]);