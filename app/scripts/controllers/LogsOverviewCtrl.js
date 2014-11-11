"use strict";

app.controller('LogsOverviewCtrl', [ '$timeout', 'entries', 'component', '$rootScope', '$location', 'getdataservice', '$scope', function ($timeout, entries, component, $rootScope, $location, getdataservice, $scope) {

	//Save reference to controller in order to avoid reference soup
	var LogsOverview = this;
  // intial active sort
  LogsOverview.predicate = 'timestamp';
  LogsOverview.reverse = false;

  // find logEntries in entry list
  if(angular.isDefinedOrNotNull(entries.data) && entries.data.length) {
    angular.forEach(entries.data, function (entry) {
      if (entry.componentSubType == null || entry.componentSubType == ""){
        LogsOverview.logEntries = entry;
      }
    });
  }else {
    LogsOverview.logEntries = "Not found";
  }

  LogsOverview.componentData = angular.fromJson(component.data.Content);



  // check if there user has previous ilog entries
  if(LogsOverview.logEntries == "Not found"){

    // Debugging

    // set ilog save method to "add"
    $rootScope.firstLogEntry = true;

    // go to ilog view
     $location.path('log');


  } else {

    // set save method to "update"
    $rootScope.firstLogEntry = false;

/*    // promt "no logs has been entered go to ilog view"
    if(angular.isUndefined($rootScope.introPrompt)){
      $timeout(function () {
        if (confirm("Gå direkte til indtastningssiden")) {
          $rootScope.introPrompt = false;
          $location.path('log');
        }
      },500);

    }*/
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