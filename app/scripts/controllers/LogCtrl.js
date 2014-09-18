"use strict";

app.controller('LogCtrl', ['$window', '$scope', 'logs', '$routeParams', function ($window, $scope, logs, $routeParams) {
	//Save reference to controller in order to avoid reference soup
	var Log = this;
  Log.test = logs.data.inputs;
  Log.numFields = [];
  for(var i=0; i<Log.test.length; i++){
    if(Log.test[i].type == "number"){
      Log.numFields.push(Log.test[i]);
    }
  }

	Log.route = $routeParams.id;
	//Test variable. If you see it when the app runs you are good to go
	Log.testVar = 'We are up and running  on Log - page!';

  // recursive function for parsing a string on the form "a, b, c" to the array[a,b,c]
  Log.parseElements = function(expr, array){
    if(expr.search(/\,/)!=-1){

      array.push(expr.slice(0, expr.search(/\,/)));
      Log.parseElements(expr.slice(expr.search(/\,/)+1, expr.length), array);
    } else if(expr.length){
      array.push(expr.slice(0, expr.length));
      expr = "";
    }
    return array;
  };

  Log.highest = function(val){
    var max = 0;
    for(var i= 0; i<val.length; i++){
      if(parseFloat(val[i])>max){
        max = parseFloat(val[i]);
      }
    }
    return max;
  };

  Log.lowest = function(val){
    var min = 99999999;
    for(var i= 0; i<val.length; i++){
      if(parseFloat(val[i])<min){
        min = parseFloat(val[i]);
      }
    }
    return min;
  };

  Log.average = function(val){
    var sum = 0;
    for(var i= 0; i<val.length; i++){
      sum += parseFloat(val[i]);
    }
    return sum/val.length;
  };

  Log.sum = function(val){
    var sum = 0;
    for(var i= 0; i<val.length; i++){
      sum += parseFloat(val[i]);
    }
    return sum;
  };

  // function binding 'formula' number scope models
  Log.parseFormula = function(formula){
    var exp = formula;
    for(var i=0; i<Log.numFields.length; i++){
      var regexp = "ID"+(i+1)+"(?!=\\.)";
      var re = new RegExp(regexp, "i");
      exp = exp.replace(re, Log.numFields[i].value);
    }

    // Checks for HIGHEST formula. returns math.max(exp) only if all number fields are filled
    if(exp.search(/HIGHEST\(/g)!=-1){
      exp = exp.replace(/HIGHEST\(/g, "").slice(0,-1);
      for(var i=0; i<Log.numFields.length; i++){
        if(angular.isUndefined(Log.numFields[i].value)) {
          // Expression returned if number fields are not defined
          return exp;
        }
      }
      var num = [];
      num = Log.parseElements(exp, num);
      return Log.highest(num);
    }

    // Checks for LOWEST formula. returns math.min(exp) only if all number fields are filled
    if(exp.search(/LOWEST\(/g)!=-1){
      exp = exp.replace(/LOWEST\(/g, "").slice(0,-1);
      for(var i=0; i<Log.numFields.length; i++){
        if(angular.isUndefined(Log.numFields[i].value)) {
          // Expression returned if number fields are not defined
          return exp;
        }
      }
      var num = [];
      num = Log.parseElements(exp, num);
      return Log.lowest(num);
    }

    // Checks for AVERAGE formula. returns math.mean.mean(exp) only if all number fields are filled
    if(exp.search(/AVERAGE\(/g)!=-1){
      exp = exp.replace(/AVERAGE\(/g, "").slice(0,-1);
      for(var i=0; i<Log.numFields.length; i++){
        if(angular.isUndefined(Log.numFields[i].value)) {
          // Expression returned if number fields are not defined
          return exp;
        }
      }
      var num = [];
      num = Log.parseElements(exp, num);
      return Log.average(num);
    }

    // Checks for SUm formula. returns math.sum(exp) only if all number fields are filled
    if(exp.search(/SUM\(/g)!=-1){
      exp = exp.replace(/SUM\(/g, "").slice(0,-1);
      for(var i=0; i<Log.numFields.length; i++){
        if(angular.isUndefined(Log.numFields[i].value)) {
          // Expression returned if number fields are not defined
          return exp;
        }
      }
      var num = [];
      num = Log.parseElements(exp, num);
      return Log.sum(num);
    }


    // Returns evaluated expression only if all number fields are filled
    for(var i=0; i<Log.numFields.length; i++){
      if(angular.isUndefined(Log.numFields[i].value)) {
        return exp;
      }
    }

    return math.eval(exp);

  }

}]);