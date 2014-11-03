"use strict";

app.controller('RapportOverviewCtrl', [ '$route', '$scope','entries','getdataservice' ,function ($route, $scope, entries, getdataservice) {
	//Save reference to controller in order to avoid reference soup
	var RapportOverview = this;
  RapportOverview.reports = [];

  // find logEntries in entry list
  if(angular.isDefinedOrNotNull(entries.data) && entries.data.length) {
    angular.forEach(entries.data, function (entry) {
      if (entry.componentSubType == "rapport"){
        var report = entry;
        report.content = angular.fromJson(entry.content);
        RapportOverview.reports.push(report);
      }
    });
  }


  // initial active sort
  RapportOverview.predicate = 'from';
  RapportOverview.reverse = false;


  $scope.changeRange = function(range){
    RapportOverview.filterRange = range;
  };

  RapportOverview.deleteReport = function(reportID){
    if (confirm('Er du sikker på du vil slette denne log?')) {

        getdataservice.deleteEntry(reportID)
          .then(function(isDeleted){
            $route.reload();
          });
    }
  };
}]);