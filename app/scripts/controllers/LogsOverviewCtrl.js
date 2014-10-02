"use strict";

app.controller('LogsOverviewCtrl', [ 'logs', '$rootScope', '$location', 'getdataservice', '$scope', function (logs, $rootScope, $location, getdataservice, $scope) {

	//Save reference to controller in order to avoid reference soup
	var LogsOverview = this;

  LogsOverview.logEntries = angular.fromJson(logs.data);

  // check if there user has previous ilog entries
  // MAKE SURE "Not found" IS ALLWAYS THE RESPONSE WHEN NO ILOG HAS BEEN ADDED.
  if(LogsOverview.logEntries == "Not found"){

    // Debugging
    console.log("no logs yet");

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
  LogsOverview.delete = function(){
    if (confirm('Er du sikker på du vil slette denne log?')) {
      getdataservice.deleteAllLogs(LogsOverview.logEntries.objectID)
        .then(function(isDeleted){
          console.log(isDeleted);
          $location.path('/');
        });
      //delete service here with item id and component id. See Component.svc/delete in userdata documentation
    } else {

    }
  };

  $scope.changeRange = function(range){
    LogsOverview.filterRange = range;
  };

	//Test variable. If you see it when the app runs you are good to go
	LogsOverview.id = 32;
}]);