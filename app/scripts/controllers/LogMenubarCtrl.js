"use strict";

app.controller('LogMenubarCtrl', ['$scope', '$location', function ($scope, $location) {
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

    // route to logsOverview view after receiving server confirmation of successful post
    //$location.path('logs');

    // for testing
    alert("Object submitted to server "+JSON.stringify(iLog));
  };

}]);