"use strict";

app.controller('LogCtrl', ['statcalcservice', '$scope', 'logs', '$routeParams','$filter', '$rootScope', function (statcalcservice, $scope, logs, $routeParams, $filter, $rootScope) {
	//Save reference to controller in order to avoid reference soup
	var Log = this;
  Log.componentData = angular.fromJson(logs.data.Content);
  Log.inputs = Log.componentData.inputs;

  Log.route = $routeParams.id;

  // SHOULD BE REPLACED WITH CORRECT BACKGROUND IMG PATH (maybe preloaded as input json)
  //Log.backgroundImg = 'http://imageserver.moviepilot.com/i-m-not-too-optimistic-because-directors-and-producers-don-t-look-at-our-articles-so-i-don-t-know-how-i-ll-feel-i-ll-still-go-to-the-movie.jpeg';
  if(angular.isDefinedOrNotNull($rootScope.backgroundImageID) ){
    console.log('background is defined in rootscope');
    Log.backgroundImg = $rootScope.backgroundImageID;
  }


  //function for formating time in data input
  Log.formatDate = function(format){
    var t = new Date().getTime();

    if(format=="date"){
      t =  $filter('date')(t, 'dd:MM:yyyy');
    }else if(format=="datetime"){
      t  =  $filter('date')(t, 'dd:MM:yyyy, hh:mm');
    } else if(format=="time"){
      t =  $filter('date')(t, 'hh:mm');
    }

    return t;
  };

  // extracts all input number fields in numFields array, such that ID1 => numFields[0]...
  Log.numFields = [];
  for(var i=0; i<Log.inputs.length; i++){
    if(Log.inputs[i].type == "number"){
      Log.numFields.push(Log.inputs[i]);
    }
    if(Log.inputs[i].type == "checkbox"){
      Log.inputs[i].value = Log.inputs[i].prechecked;
    }
    if(Log.inputs[i].type == "data"){
      Log.inputs[i].value = Log.formatDate(Log.inputs[i].data);
    }
  }

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





  // main function for parsing formula field in relation to number input fields
  Log.parseFormula = function(input, index){
    var exp = input.formula;

    // finds and replaces all "ID" references with corresponding number input fields
    for(var i=0; i<Log.numFields.length; i++){
      var regexp = "ID"+(Log.numFields[i].id)+"(?!=\\.)";
      var re = new RegExp(regexp, "i");
      exp = exp.replace(re, Log.numFields[i].value);
    }

    // returns placeholder expression if input number fields are not filled out
    for(var i=0; i<Log.numFields.length; i++){
      if(angular.isUndefined(Log.numFields[i].value)) {
        // empty input value if number fields are not defined
        Log.inputs[index].value = null;
        // Expression returned if number fields are not defined
        return exp;
      }
    }


    // Checks for HIGHEST formula. returns math.max(exp) only if all number fields are filled
    if(exp.search(/HIGHEST\(/g)!=-1){

      if(exp.search(/HIGHEST\(([^\(]+)(?=\))/i)!=-1){
        var func = exp.match(/HIGHEST\(([^\(]+)(?=\))/ig);
        func[0] = func[0].replace(/HIGHEST\(/g, "");
        var num = [];
        num = Log.parseElements(func[0], num);
        exp = exp.replace(/HIGHEST\(([^\(]+)\)/ig, statcalcservice.highest(num));
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
        exp = exp.replace(/LOWEST\(([^\(]+)\)/ig, statcalcservice.lowest(num));
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
        exp = exp.replace(/AVERAGE\(([^\(]+)\)/ig, statcalcservice.average(num));
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
        exp = exp.replace(/SUM\(([^\(]+)\)/ig, statcalcservice.sum(num));
      }else{
        // SUM function includes invalid parenthesises. ex  FUNC( (ID1*100), ID2)
        // return either empty string or error
        return exp;

      }
    }
    // evaluates and sets parsed string expression to input field value
    Log.inputs[index].value = $scope.$eval(exp);

    // evaluates and returns parsed string expression as angular expression
    return $scope.$eval(exp);

  }

}]);