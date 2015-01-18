"use strict";

app.controller('LogCtrl', ['entries', 'statcalcservice', '$scope', 'component', '$routeParams','$filter', '$rootScope', function (entries, statcalcservice, $scope, component, $routeParams, $filter, $rootScope) {
	//Save reference to controller in order to avoid reference soup
	var Log = this;
  Log.componentData = angular.fromJson(component.data.Content);
  Log.inputs = Log.componentData.inputs;
  Log.timeInput = Log.componentData.settings.timeInput;

  //check if any of the inputs is required
  Log.anyInputsRequired = false;

  // ------------- test variable for inline labels ----------------------

  Log.inline = false;

//check if any attributes is required
  for(var i = 0; i < Log.inputs.length; i++){
   if(Log.inputs[i].required && Log.inputs[i].required=== true ){
     Log.anyInputsRequired = true;
   }}

  // load and parse log to edit when in edit ilog view
  Log.route = $routeParams.id;
  if(angular.isDefinedOrNotNull(Log.route)){
    // find logEntries in entry list
    if(angular.isDefinedOrNotNull(entries.data) && entries.data.length) {
      angular.forEach(entries.data, function (entry) {
        if (entry.componentSubType == null || entry.componentSubType == ""){
          Log.logEntries = entry;
        }
      });
    }
    Log.currentLog = angular.fromJson(Log.logEntries.content)[Log.route];
  }


  if(angular.isDefinedOrNotNull($rootScope.backgroundImageID) ){
    Log.backgroundImg = $rootScope.backgroundImageID;
  }

  // ser variables for time input
  Log.hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  Log.minutes = [];
  Log.seconds = [];
  Log.centiseconds = [];

  for(var i = 0; i<60; i++){
    Log.minutes.push(i);
    Log.seconds.push(i);
  }
  for(var i = 0; i<100; i++){
    Log.centiseconds.push(i);
  }

  // function for calculating time input field value in seconds
  Log.calcTimeVal = function(obj){
    var val = 0;
    if (angular.isDefinedOrNotNull(obj.hh)){
      val += 3600*obj.hh;
    }
    if (angular.isDefinedOrNotNull(obj.mm)){
      val += 60*obj.mm;
    }
    if (angular.isDefinedOrNotNull(obj.ss)){
      val += obj.ss;
    }
    if (angular.isDefinedOrNotNull(obj.cscs)){
      val += obj.cscs / 100;
    }
    return val;
  };


  //function for formating time in data input
  Log.formatDate = function(format){
    var t = new Date().getTime();

    if(format=="date"){
      t =  $filter('date')(t, 'dd-MM-yyyy');
    }else if(format=="datetime"){
      t  =  $filter('date')(t, 'dd-MM-yyyy, H:mm');
    } else if(format=="time"){
      t =  $filter('date')(t, 'H:mm');
    }

    return t;
  };

  // extracts all input number fields in numFields array, such that ID1 => numFields[0]...
  Log.numFields = [];
  for(var i=0; i<Log.inputs.length; i++){
    if(Log.inputs[i].type == "number" || Log.inputs[i].type == "time"){
      Log.numFields.push(Log.inputs[i]);
    }
    if(Log.inputs[i].type == "checkbox"){
      Log.inputs[i].value = Log.inputs[i].prechecked;
    }
    if(Log.inputs[i].type == "data"){
      Log.inputs[i].value = Log.formatDate(Log.inputs[i].data);
    }

    // for debugging
    /*    if(Log.inputs[i].type == "time"){
      Log.inputs[i].data = "hh:mm:ss,cscs";
    }
    // for debugging
   if(Log.inputs[i].type == "formula"){
      Log.inputs[i].formula = "TIMEFORMAT(ID8, 'hh:mm:ss,cscs')";
    }*/
  }

  // sets up timeInput value if it exists, otherwise generate new timestampe using Log.formatDate()
  if(angular.isDefined(Log.currentLog.timeInput) && Log.currentLog.timeInput != 0 && Log.currentLog.timeInput != null){
    Log.timeInput.value = Log.currentLog.timeInput;
  } else {
    Log.timeInput.value = Log.formatDate(Log.timeInput.format);
  }

  // populate log form fields if user is in edit log view
  if(angular.isDefinedOrNotNull(Log.route)){
    for(var i=0; i<Log.inputs.length; i++){
      if(Log.inputs[i].type != "formula"){
        Log.inputs[i].value = Log.currentLog.data[Log.inputs[i].id];
      }
      if(Log.inputs[i].type == "time"){
        // initialize time selects from input value
        var val = Log.inputs[i].value;
        if (Log.inputs[i].data.search('hh') != -1){
          Log.inputs[i].hh = parseInt(val / 3600);
          val = val % 3600;
        }
        if (Log.inputs[i].data.search('mm') != -1){
          Log.inputs[i].mm = parseInt(val / 60);
          val = val % 60;
        }
        if (Log.inputs[i].data.search('ss') != -1){
          Log.inputs[i].ss = parseInt(val);
          val = val -  Log.inputs[i].ss;
        }
        if (Log.inputs[i].data.search('cscs') != -1){
          Log.inputs[i].cscs = Math.round(val*100);
        }
      }
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
    for(var i=0; i<Log.inputs.length; i++){
      var regexp = "ID"+(Log.inputs[i].id)+"(?!=\\.)";
      var re = new RegExp(regexp, "i");
      exp = exp.replace(re, Log.inputs[i].value);
    }


    // returns if input field used in formula are undefined and clear view variables
    if(exp.search('undefined')!=-1){
      Log.inputs[index].value = null;
      Log.inputs[index].output = null;
      return exp;
    }
/*
    // returns placeholder expression if input number fields are not filled out
   for(var i=0; i<Log.numFields.length; i++){
      if(angular.isUndefined(Log.numFields[i].value)) {
        // empty input value if number fields are not defined
        Log.inputs[index].value = null;
        // Expression returned if number fields are not defined
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

    // Checks for TIMEFORMAT formula. returns math.sum(exp) only if all number fields are filled
    if(exp.search(/TIMEFORMAT\(/g)!=-1){
      if(exp.search(/TIMEFORMAT\(([^\(]+)(?=\))/i)!=-1){
        var func = exp.match(/TIMEFORMAT\(([^\(]+)(?=\))/ig);
        func[0] = func[0].replace(/TIMEFORMAT\(/g, "");

        // if timeformat is incased in ', parseElements() breaks, so the following extracts and parses timeformat to format[0].
        var format = func[0].match(/\'([^\(]+)(?=\')/ig);
        format[0] = format[0].replace(/\'/ig, "");
        func[0] = func[0].replace(/\'/ig, "");

        var num = func[0].slice(0, func[0].search(/\,/));

        // extract and replace elements in timeformat, num[1], ex relpace hh in 'hh:mm:ss' with hour value
        var val = num;
        if (format[0].search('hh') != -1){
          format[0] = format[0].replace('hh', parseInt(val / 3600));
          val = val % 3600;
        }
        if (format[0].search('mm') != -1){
          format[0] = format[0].replace('mm', parseInt(val / 60));
          val = val % 60;
        }
        if (format[0].search('ss') != -1){
          format[0] = format[0].replace('ss', parseInt(val));
          val = val - parseInt(val);
        }
        if (format[0].search('cscs') != -1){
          format[0] = format[0].replace('cscs', Math.round(val*100));
        }
        exp = exp.replace(/TIMEFORMAT\(([^\(]+)\)/ig, format[0]);

        // return formated time
        Log.inputs[index].value = exp;
        return exp;

      }else{
        // TIMEFORMAT function includes invalid parenthesises. ex  FUNC( (ID1*100), ID2)
        // return either empty string or error
        return exp;

      }
    }

    // evaluates and sets parsed string expression to input field value
    if($scope.$eval(exp)!="Infinity") {
      Log.inputs[index].value = $scope.$eval(exp).toFixed(input.decimals);

      // parse input field value as string and replace dot with comma in 'input.output'. ONLY FORR DISPLAY IN VIEW
      Log.inputs[index].output = $scope.$eval(exp).toFixed(input.decimals).toString().replace('.',',');

    } else {
      Log.inputs[index].value = null;
      return exp;
    }
    // evaluates and returns parsed string expression as angular expression
    return $scope.$eval(exp);  // .toString().replace('.',',')

  }

}]);