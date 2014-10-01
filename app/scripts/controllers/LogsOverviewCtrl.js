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





  }

  //Delete log
  LogsOverview.delete = function(index, event){
    if (confirm('Er du sikker på du vil slette denne log?')) {
      alert('sletted')
      getdataservice.deleteEntry();
      //delete service here with item id and component id. See Component.svc/delete in userdata documentation
    } else {

    }
    event.preventDefault();
  };

  $scope.changeRange = function(range){
    LogsOverview.filterRange = range;
  };

	//Test variable. If you see it when the app runs you are good to go
	LogsOverview.id = 32;
}]);