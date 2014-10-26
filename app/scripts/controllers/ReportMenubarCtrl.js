"use strict";

app.controller('ReportMenubarCtrl', ['$routeParams', function ($routeParams) {
	//Save reference to controller in order to avoid reference soup
	var ReportMenubar = this;



	//dummy report array as it should look after parsing
  ReportMenubar.reports = [
    {
      created: 1414162814519,
      "from" : "1321009871",
      "to" : "1356174671",
      "title" : "Report1",
      "shared" : true
    },
    {
      created: 1414162814519,
      "from" : "1321009871",
      "to" : "1354360271",
      "title" : "Report2",
      "shared" : false
    },
    {
      created: 1414162814519,
      "from" : "1321009871",
      "to" : "1356952271",
      "title" : "Report3",
      "shared" : true
    },
    {
      created: 1414162814519,
      "from" : "1321009871",
      "to" : "1356174671",
      "title" : "Report4",
      "shared" : true
    },
    {
      created: 1414162814519,
      "from" : "1321009871",
      "to" : "1355483471",
      "title" : "Report5",
      "shared" : true
    }
  ]

  ReportMenubar.route = $routeParams.id;
  if(angular.isDefinedOrNotNull(ReportMenubar.route)){
    ReportMenubar.currentReport = ReportMenubar.reports[ReportMenubar.route];
  }


}]);
