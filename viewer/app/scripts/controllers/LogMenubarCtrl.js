"use strict";

app.controller('LogMenubarCtrl', ['$routeParams', 'getdataservice', '$rootScope', '$scope', '$location', function ($routeParams, getdataservice, $rootScope, $scope, $location) {
  //Save reference to controller in order to avoid reference soup
  var LogMenubar = this;

  LogMenubar.justSaved = false;

  LogMenubar.checkInputs = function(){

    // check if log has just been saved to ignore confirm promt
    if(LogMenubar.justSaved){
      $location.path('logs');
      return;
    }
    // if new log entry, check if fields has been filled before discarding these
    if(!angular.isDefined($scope.$parent.Log.route)){
      for(var i=0; i<$scope.$parent.Log.inputs.length; i++){
        if(angular.isDefined($scope.$parent.Log.inputs[i].value) && $scope.$parent.Log.inputs[i].type != "data" && $scope.$parent.Log.inputs[i].type != "formula"){
          if(confirm("Der er foretaget ikke-gemte indtastninger. Disse vil gå tabt hvis du fortsætter.")){
            $location.path('logs');
            return;
          } else {
            return;
          }
        }
      }
      $location.path('logs');
      return;
    }
    // checks if fields has been changed, and alerts before such changes are discarded
    for(var i=0; i<$scope.$parent.Log.inputs.length; i++){
      if(angular.isDefined($scope.$parent.Log.inputs[i].value)){
        if($scope.$parent.Log.inputs[i].value != $scope.$parent.Log.currentLog.data[$scope.$parent.Log.inputs[i].id]){
          if(confirm("Der er foretaget ikke-gemte indtastninger. Disse vil gå tabt hvis du fortsætter.")){
            $location.path('logs');
            return;
          } else {
            return;
          }
        }
      }

    }
    // check if timeInput have been changed
    if(angular.isDefined($scope.$parent.Log.timeInput.value) && angular.isDefined($scope.$parent.Log.currentLog.timeInput) && $scope.$parent.Log.timeInput.value != $scope.$parent.Log.currentLog.timeInput){
      if(confirm("Der er foretaget ikke-gemte indtastninger. Disse vil gå tabt hvis du fortsætter.")) {
        $location.path('logs');
        return;
      } else {
        return;
      }
    }
    $location.path('logs');

  };

  //Delete log
  LogMenubar.deleteLog = function(){
    if (confirm('Er du sikker på du vil slette denne log?')) {
      if(angular.isDefinedOrNotNull($scope.$parent.Log.route)){
        getdataservice.getList()
          .then(function(data){
            if(angular.isDefinedOrNotNull(data.data) && data.data.length) {
              angular.forEach(data.data, function (entry) {
                if (entry.componentSubType == null || entry.componentSubType == "") {
                  var iLogs = angular.fromJson(entry.content);
                  iLogs.splice($scope.$parent.Log.route,1);
                  getdataservice.updateLog(iLogs, entry.objectID)
                    .then(function (data) {
                      // on success go to logs view
                      $rootScope.introPrompt = false;
                      $location.path('logs');
                    });
                }
              });
            }
          }, function(error){
          });
      } else {
        $location.path('logs');
        return;
      }
    }
  };

  LogMenubar.saveLog = function(){

    // build json object
    var d = new Date();
    var iLog = {
      "timestamp" : d.getTime(),
      "timeInput" : $scope.$parent.Log.timeInput.value,
      "data" : {} };

    // checks if all required fields are filled, alerts and returns if not
    for(var i=0; i<$scope.$parent.Log.inputs.length; i++){
      if($scope.$parent.Log.inputs[i].required){
        if(!$scope.$parent.Log.inputs[i].value){
          alert("Udfyld venlgst alle påkrævede felter.");
          return;
        }
      }

    }
    $rootScope.loadingView = true;

    // loop igennem alle input elementer og gem hver value i iLog json
    for(var i=0; i<$scope.$parent.Log.inputs.length; i++){
        // check if values exist, if not json attributes are set to null
        if(!angular.isUndefined($scope.$parent.Log.inputs[i].value)){
          iLog.data[$scope.$parent.Log.inputs[i].id] = $scope.$parent.Log.inputs[i].value;
        } else {
          iLog.data[$scope.$parent.Log.inputs[i].id] = null;
        }
    }

    // post json to server
    if($rootScope.firstLogEntry){
      // no prior ilogs so use addEntry
      var newlog = [];
      newlog.push(iLog);
      getdataservice.addNewLog(angular.toJson(newlog))
        .then(function(data){
          // on success go to logs view
          $rootScope.introPrompt = false;
          // stay in current log after save
          //$location.path('logs');
          $rootScope.loadingView = false;
          LogMenubar.justSaved = true;

        }, function(err){
          // on err
          alert("Error: "+err);
        });

    } else if(angular.isDefinedOrNotNull($scope.$parent.Log.route)){
      // edit log at index $scope.$parent.Log.route

      getdataservice.getList()
        .then(function(data){
          if(angular.isDefinedOrNotNull(data.data) && data.data.length) {
            angular.forEach(data.data, function (entry) {
              if (entry.componentSubType == null || entry.componentSubType == "") {
                var iLogs = angular.fromJson(entry.content);
                iLogs[$scope.$parent.Log.route] = iLog;
                getdataservice.updateLog(iLogs, entry.objectID)
                  .then(function (data) {
                    // on success go to logs view
                    $rootScope.introPrompt = false;
                    // stay in current log after save
                    //$location.path('logs');
                    $rootScope.loadingView = false;
                    LogMenubar.justSaved = true;

                  });
              }
            });
          }
        }, function(error){
        });

    } else {
      // prior ilogs exist so use updateEntry
      getdataservice.getList()
        .then(function(data){
          if(angular.isDefinedOrNotNull(data.data) && data.data.length) {
            angular.forEach(data.data, function (entry) {
              if (entry.componentSubType == null || entry.componentSubType == "") {
                var iLogs = angular.fromJson(entry.content);
                iLogs.push(iLog);
                getdataservice.updateLog(iLogs, entry.objectID)
                  .then(function (data) {
                    // on success go to logs view
                    $rootScope.introPrompt = false;
                    // stay in current log after save
                    //$location.path('logs');
                    $rootScope.loadingView = false;
                    LogMenubar.justSaved = true;

                  });
              }
            });
          }
        }, function(error){
        });

    }

    // for testing
    //alert("Object submitted to server "+JSON.stringify(iLog));
  };

}]);