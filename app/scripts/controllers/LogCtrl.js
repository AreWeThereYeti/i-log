"use strict";

app.controller('LogCtrl', ['$window', '$scope', 'logs', '$routeParams', function ($window, $scope, logs, $routeParams) {
	//Save reference to controller in order to avoid reference soup
	var Log = this;

	Log.test = logs.data.inputs;
	Log.route = $routeParams.id;
	//Test variable. If you see it when the app runs you are good to go
	Log.testVar = 'We are up and running  on Log - page!';

  $window.Math.max

  // function binding 'formula' number scope models
  Log.parseFormula = function(formula){
    var exp;
    // needs loop that
    exp = formula.replace(/ID.(?!=\\.)/i, Log.ID1);
    exp = exp.replace(/ID.(?!=\\.)/i, Log.ID2);
    return exp;
  }


}]);