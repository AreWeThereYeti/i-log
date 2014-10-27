"use strict";

app.controller('ReportMenubarCtrl', ['$routeParams', '$scope', function ($routeParams, $scope) {
	//Save reference to controller in order to avoid reference soup
	var ReportMenubar = this;


  ReportMenubar.route = $routeParams.id;
  if(angular.isDefinedOrNotNull(ReportMenubar.route)){
    ReportMenubar.currentReport = $scope.$parent.Rapport.reports[ReportMenubar.route];
  }


}]);
