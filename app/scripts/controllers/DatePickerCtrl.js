"use strict";

app.controller('DatePickerCtrl', ['$location', '$rootScope', '$route', 'getdataservice', '$scope','DateService' ,function ($location,$rootScope, $route, getdataservice, $scope, DateService) {
//	Ctrl uses scope in order to use it in directive
	$scope.year = DateService.year;
	$scope.month = DateService.month;
	$scope.day = DateService.day;

	$scope.update = function(index){
		$scope.fromYear = $scope.year[index];
	};

  // initiates to date with the date of today

  var d = new Date();
	$scope.toYear = d.getFullYear();
	$scope.toMonth= DateService.month[d.getMonth()];
	$scope.toDay  = d.getDate();


// initiates fromdate with the date of today - 30 days
  var d2 = new Date();
  d2.setDate(d2.getDate() - 30);
  $scope.fromYear = d2.getFullYear();
  $scope.fromMonth= DateService.month[d2.getMonth()];
  $scope.fromDay  = d2.getDate();

  //On create report click
	$scope.createReport = function(){
    //Check if "from date " is defined
		if(angular.isDefined($scope.fromYear && $scope.fromMonth && $scope.fromDay)){
			$scope.dateFrom =  new Date(($scope.fromYear + '/' + $scope.fromMonth.val + '/' + $scope.fromDay)).getTime();
		}


    //Check if "to date" is defined
		if(angular.isDefined($scope.toYear && $scope.toMonth && $scope.toDay)){
			$scope.dateTo =  new Date(($scope.toYear + '/' + $scope.toMonth.val + '/' + $scope.toDay)).getTime();
		}

    //If both are defined as well as report title, contact server
		if(angular.isDefined($scope.dateTo && $scope.dateFrom && $scope.title)){
      //ready report
      var reportData = {
        "title": $scope.title,
        "data":
          {
            "from": $scope.dateFrom,
            "to": $scope.dateTo,
            "created": new Date().getTime(),
            "shared": false
          }
      };
      //save report

      getdataservice.addNewReport(reportData)
        .then(function(data){
          // on success reload report view
          $rootScope.dialog = '';
          //$route.reload();
          $location.path("rapport/new");
        }, function(err){
          // on err
          alert("Error: "+err);
        });


		}
	}

}]);