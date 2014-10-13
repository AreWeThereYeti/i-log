"use strict";

app.controller('DatePickerCtrl', ['$scope','DateService' ,function ($scope, DateService) {
//	Ctrl uses scope in order to use it in directive
	$scope.year = DateService.year;
	$scope.month = DateService.month;
	$scope.day = DateService.day;

  //On create report click
	$scope.createReport = function(){
    //Check if "from date " is defined
		if(angular.isDefined($scope.fromYear && $scope.fromMonth && $scope.fromDay)){
			$scope.dateFrom =  new Date(($scope.fromYear + '-' + $scope.fromMonth.val + '-' + $scope.fromDay)).getTime();
		}

    //Check if "to date" is defined
		if(angular.isDefined($scope.toYear && $scope.toMonth && $scope.toDay)){
			$scope.dateTo =  new Date(($scope.toYear + '-' + $scope.toMonth.val + '-' + $scope.toDay)).getTime();
		}

    //If both are defined as well as report title, contact server
		if(angular.isDefined($scope.dateTo && $scope.dateFrom && $scope.title)){
      //debug message
      $scope.data = [{
        "title": $scope.title,
        "dateFrom": $scope.dateFrom,
        "dateTo": $scope.dateTo,
        "created": new Date().getTime(),
        "shared": false
      }];

      console.log($scope.data);
		}
	}

}]);