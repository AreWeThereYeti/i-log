"use strict";

app.controller('LogsOverviewCtrl', [ '$timeout', 'entries', 'component', '$rootScope', '$location', 'getdataservice', '$scope', '$route', function ($timeout, entries, component, $rootScope, $location, getdataservice, $scope, $route) {

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

  // recursive function for parsing a string on the form "a, b, c" to the array[a,b,c]
  LogsOverview.parseElements = function(expr, array){
    if(expr.search(/\,/)!=-1){

      array.push($scope.$eval(expr.slice(0, expr.search(/\,/))));
      LogsOverview.parseElements(expr.slice(expr.search(/\,/)+1, expr.length), array);
    } else if(expr.length){
      array.push($scope.$eval(expr.slice(0, expr.length)));
      expr = "";
    }
    return array;
  };

  // prepare list of input fields and values to display in log list
  var fields = [];
  LogsOverview.parseElements(LogsOverview.componentData.settings.listview, fields);
  LogsOverview.listView = [];
  angular.forEach(LogsOverview.componentData.inputs, function(logInput){
    angular.forEach(fields, function(field){
      if(logInput.id == field){
        if(angular.isDefined(logInput.unit)){
          LogsOverview.listView.push({
            label: logInput.label,
            fieldID: logInput.id,
            unit: logInput.unit
          })
        } else {
          LogsOverview.listView.push({
            label: logInput.label,
            fieldID: logInput.id,
            unit: ''
          })
        }
      }
    });
  });

  //Delete log
  LogsOverview.deleteLog = function(logIndex){
    if (confirm('Er du sikker på du vil slette denne log?')) {
      var newLogs = angular.fromJson(LogsOverview.logEntries.content);
      newLogs.splice(logIndex,1);
      if(newLogs.length){
        getdataservice.updateLog(newLogs, LogsOverview.logEntries.objectID)
        .then(function(isDeleted){
          $route.reload()
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

  LogsOverview.computeCssClass = function(lastField){
    var cssClass = null;
    if(lastField){
      var fieldSize = 8-LogsOverview.listView.length;
      if(fieldSize >= 3){
        cssClass = "col-"+(fieldSize-2)+"-8";

        return cssClass
      }
    } else if (LogsOverview.listView.length==0){
      return "col-6-8"

    }
    return "col-1-8"
  };

	//Test variable. If you see it when the app runs you are good to go
	LogsOverview.id = 32;
}]);