"use strict";

app.controller('RapportOverviewCtrl', [ '$scope','reports','getdataservice' ,function ($scope,reports, getdataservice) {
	//Save reference to controller in order to avoid reference soup
	var RapportOverview = this;

	RapportOverview.reports = reports.data.reports;

    var test;

    RapportOverview.click = function(){
        test = getdataservice.loadComponent()
            .then(function(data){
                console.log('test : ' + data)
            });
    };

  $scope.changeRange = function(range){
    RapportOverview.filterRange = range;
  };

  //Test variable. If you see it when the app runs you are good to go
	RapportOverview.testVar = 'We are up and running  on rapports overview -page!';
	RapportOverview.testid = 24;
}]);