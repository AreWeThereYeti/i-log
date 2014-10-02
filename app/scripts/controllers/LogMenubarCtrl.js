"use strict";

app.controller('LogMenubarCtrl', ['getdataservice', '$rootScope', '$scope', '$location', function (getdataservice, $rootScope, $scope, $location) {
  //Save reference to controller in order to avoid reference soup
  var LogMenubar = this;

  //Test variable. If you see it when the app runs you are good to go
  LogMenubar.testVar = 'This is data from the menubar!';

  LogMenubar.checkInputs = function(){

    // checks if all required fields are filled, alerts and returns if not
    for(var i=0; i<$scope.$parent.Log.inputs.length; i++){
      if($scope.$parent.Log.inputs[i].type != "data" && $scope.$parent.Log.inputs[i].type != "formula"){
        if($scope.$parent.Log.inputs[i].value){
          if(confirm("Der er foretaget ikke-gemte indtastninger. Disse vil gå tabt hvis du fortsætter.")){
            $location.path('logs');
            return;
          } else {
            return;
          }
        }
      }

    }
    $location.path('logs');

  };

  LogMenubar.saveLog = function(){

    // build json object
    var d = new Date();
    var iLog = {"timestamp" : d.getTime(), "data" : {} };

    // checks if all required fields are filled, alerts and returns if not
    for(var i=0; i<$scope.$parent.Log.inputs.length; i++){
      if($scope.$parent.Log.inputs[i].required){
        if(!$scope.$parent.Log.inputs[i].value){
          alert("Udfyld venlgst alle påkrævede felter.");
          return;
        }
      }

    }

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
          $location.path('logs');
        }, function(err){
          // on err
          alert("Error: "+err);
        });

    }else{
      // prior ilogs exist so use updateEntry
      getdataservice.getLatest()
        .then(function(data){
          var iLogs = angular.fromJson(data.data.content);
          iLogs.push(iLog);
          console.log(" new log array: "+iLogs);
          getdataservice.updateLog(iLogs, data.data.objectID)
            .then(function(data){
              // on success go to logs view
              $rootScope.introPrompt = false;
              $location.path('logs');            });
        }, function(error){
          console.log(error);
        });

    }

    // for testing
    alert("Object submitted to server "+JSON.stringify(iLog));
  };

}]);