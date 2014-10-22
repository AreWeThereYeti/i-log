"use strict";

app.controller('LogsOverviewCtrl', [ 'component', 'logs', '$rootScope', '$location', 'getdataservice', '$scope', function (component, logs, $rootScope, $location, getdataservice, $scope) {

	//Save reference to controller in order to avoid reference soup
	var LogsOverview = this;

  LogsOverview.logEntries = angular.fromJson(logs.data);
  LogsOverview.componentData = angular.fromJson(component.data.Content);

  // check if there user has previous ilog entries
  // MAKE SURE "Not found" IS ALLWAYS THE RESPONSE WHEN NO ILOG HAS BEEN ADDED.
  if(LogsOverview.logEntries == "Not found"){

    // Debugging

    // set ilog save method to "add"
    $rootScope.firstLogEntry = true;

    // go to ilog view
     $location.path('log');


  } else {

    // set save method to "update"
    $rootScope.firstLogEntry = false;

    // promt "no logs has been entered go to ilog view"
    if(angular.isUndefined($rootScope.introPrompt)){
      if (confirm("Gå direkte til indtastningssiden")) {

        $rootScope.introPrompt = false;
        $location.path('log');
      }
    }
    $rootScope.introPrompt = false;

     // load logs into view
    LogsOverview.logs = angular.fromJson(LogsOverview.logEntries.content);
    for(var i = 0; i<LogsOverview.logs.length; i++){
      LogsOverview.logs[i].id = i;
    }




  }

  //Delete log
  LogsOverview.deleteLog = function(logIndex){
    if (confirm('Er du sikker på du vil slette denne log?')) {
      var newLogs = angular.fromJson(LogsOverview.logEntries.content);
      newLogs.splice(logIndex,1);
      if(newLogs.length){
        getdataservice.updateLog(newLogs, LogsOverview.logEntries.objectID)
        .then(function(isDeleted){
          $location.path('/');
        });
      } else {
        LogsOverview.deleteAll();
      }

    }
  };

  //Delete all logs
  LogsOverview.deleteAll = function(){
    if (confirm('Er du sikker på du vil slette alle logs?')) {
      getdataservice.deleteAllLogs(LogsOverview.logEntries.objectID)
        .then(function(isDeleted){
          $location.path('/');
        });
    }
  };

  $scope.changeRange = function(range){
    LogsOverview.filterRange = range;
  };

	//Test variable. If you see it when the app runs you are good to go
	LogsOverview.id = 32;
}]);