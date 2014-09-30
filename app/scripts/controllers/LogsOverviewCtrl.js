"use strict";

app.controller('LogsOverviewCtrl', [ '$scope','$location', function ($scope, $location) {
	//Save reference to controller in order to avoid reference soup
	var LogsOverview = this;

  //Delete log
  LogsOverview.delete = function(index, event){
    if (confirm('Er du sikker på du vil slette denne log??')) {
      alert('sletted')
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