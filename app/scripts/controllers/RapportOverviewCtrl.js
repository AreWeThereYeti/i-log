"use strict";

app.controller('RapportOverviewCtrl', [ '$scope','reports','getdataservice' ,function ($scope,reports, getdataservice) {
	//Save reference to controller in order to avoid reference soup
	var RapportOverview = this;

	RapportOverview.reports = [
      {
        "from" : "1321009871",
        "to" : "1356174671",
        "title" : "Report1",
        "shared" : true
      },
      {
        "from" : "1321009871",
        "to" : "1354360271",
        "title" : "Report2",
        "shared" : false
      },
      {
        "from" : "1321009871",
        "to" : "1356952271",
        "title" : "Report3",
        "shared" : true
      },
      {
        "from" : "1321009871",
        "to" : "1356174671",
        "title" : "Report4",
        "shared" : true
      },
      {
        "from" : "1321009871",
        "to" : "1355483471",
        "title" : "Report5",
        "shared" : true
      }
    ];

    var test;

    RapportOverview.click = function(){
      test = getdataservice.loadComponent()
        .then(function(data){
            console.log('test : ' + JSON.stringify(angular.fromJson(data.data.Content)))
        });
    };

  RapportOverview.getAll = function(){
    test = getdataservice.getLatest()
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