"use strict";

app.controller('LogCtrl', ['$scope', 'logs', '$routeParams', function ($scope, logs, $routeParams) {
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

      array.push($scope.$eval(expr.slice(0, expr.search(/\,/))));
      Log.parseElements(expr.slice(expr.search(/\,/)+1, expr.length), array);
    } else if(expr.length){
      array.push($scope.$eval(expr.slice(0, expr.length)));
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

/*  //  formats TIMEFORMAT(ID1, ‘hh:mm:ss’)
  Log.timeFormat = function(val){
    var time = "";


  };*/

  // function binding 'formula' number scope models
  Log.parseFormula = function(formula){
    var exp = formula;
    for(var i=0; i<Log.numFields.length; i++){
      var regexp = "ID"+(i+1)+"(?!=\\.)";
      var re = new RegExp(regexp, "i");
      exp = exp.replace(re, Log.numFields[i].value);
    }

    for(var i=0; i<Log.numFields.length; i++){
      if(angular.isUndefined(Log.numFields[i].value)) {
        // Expression returned if number fields are not defined
        return exp;
      }
    }

    // TIMEFORMAT
/*    if(exp.search(/TIMEFORMAT\(/g)!=-1){

      if(exp.search(/TIMEFORMAT\(([^\(]+)(?=\))/i)!=-1){ // findes der et HIGHER(...) udtryk (ikke HIGHER(...()...))
        var func = exp.match(/TIMEFORMAT\(([^\(]+)(?=\))/ig);
        func[0] = func[0].replace(/TIMEFORMAT\(/g, "");

        var num = [];
        num = Log.parseElements(func[0], num);
        exp = exp.replace(/TIMEFORMAT\(([^\(]+)\)/ig, Log.timeFormat(num));
      }else{
        // HIGHEST function includes invalid parenthesises. ex  FUNC( (ID1*100), ID2)
        // return either empty string or error
        return exp;

      }
    }*/


    // Checks for HIGHEST formula. returns math.max(exp) only if all number fields are filled
    if(exp.search(/HIGHEST\(/g)!=-1){

      if(exp.search(/HIGHEST\(([^\(]+)(?=\))/i)!=-1){
        var func = exp.match(/HIGHEST\(([^\(]+)(?=\))/ig);
        func[0] = func[0].replace(/HIGHEST\(/g, "");
        var num = [];
        num = Log.parseElements(func[0], num);
        exp = exp.replace(/HIGHEST\(([^\(]+)\)/ig, Log.highest(num));
      }else{
        // HIGHEST function includes invalid parenthesises. ex  FUNC( (ID1*100), ID2)
        // return either empty string or error
        return exp;

      }
    }

    // Checks for LOWEST formula. returns math.min(exp) only if all number fields are filled
    if(exp.search(/LOWEST\(/g)!=-1){

      if(exp.search(/LOWEST\(([^\(]+)(?=\))/i)!=-1){
        var func = exp.match(/LOWEST\(([^\(]+)(?=\))/ig);
        func[0] = func[0].replace(/LOWEST\(/g, "");
        var num = [];
        num = Log.parseElements(func[0], num);
        exp = exp.replace(/LOWEST\(([^\(]+)\)/ig, Log.lowest(num));
      }else{
        // LOWEST function includes invalid parenthesises. ex  FUNC( (ID1*100), ID2)
        // return either empty string or error
        return exp;

      }
    }

    // Checks for AVERAGE formula. returns math.mean.mean(exp) only if all number fields are filled
    if(exp.search(/AVERAGE\(/g)!=-1){
      if(exp.search(/AVERAGE\(([^\(]+)(?=\))/i)!=-1){
        var func = exp.match(/AVERAGE\(([^\(]+)(?=\))/ig);
        func[0] = func[0].replace(/AVERAGE\(/g, "");
        var num = [];
        num = Log.parseElements(func[0], num);
        exp = exp.replace(/AVERAGE\(([^\(]+)\)/ig, Log.average(num));
      }else{
        // AVERAGE function includes invalid parenthesises. ex  FUNC( (ID1*100), ID2)
        // return either empty string or error
        return exp;

      }
    }

    // Checks for SUm formula. returns math.sum(exp) only if all number fields are filled
    if(exp.search(/SUM\(/g)!=-1){
      if(exp.search(/SUM\(([^\(]+)(?=\))/i)!=-1){
        var func = exp.match(/SUM\(([^\(]+)(?=\))/ig);
        func[0] = func[0].replace(/SUM\(/g, "");
        var num = [];
        num = Log.parseElements(func[0], num);
        exp = exp.replace(/SUM\(([^\(]+)\)/ig, Log.sum(num));
      }else{
        // SUM function includes invalid parenthesises. ex  FUNC( (ID1*100), ID2)
        // return either empty string or error
        return exp;

      }
    }

    return $scope.$eval(exp);

  }

}]);