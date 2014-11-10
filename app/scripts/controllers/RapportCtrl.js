"use strict";

app.controller('RapportCtrl', ['$routeParams', 'component', '$scope', 'entries', 'statcalcservice', function ($routeParams, component, $scope, entries, statcalcservice) {
	//Save reference to controller in order to avoid reference soup
	var Rapport = this;

  Rapport.reports = [];

  // populate Rapport.logs with all user logs and Rapport.reports wit all reports
  if(angular.isDefinedOrNotNull(entries.data) && entries.data.length) {
    angular.forEach(entries.data, function (entry) {
      if (entry.componentSubType == null || entry.componentSubType == ""){
        Rapport.logs = angular.fromJson(entry.content);
      }else if(entry.componentSubType == "rapport"){
        var report = entry;
        report.content = angular.fromJson(entry.content);
        Rapport.reports.push(report);
      }
    });
  }else {
    LogsOverview.logEntries = "Not found";
  }

  Rapport.component = angular.fromJson(component.data.Content);

  Rapport.dataList = [];
  Rapport.dataDiagram = [];
  Rapport.dataGraph = [];

  for(var i=0; i<Rapport.component.reports.length; i++){
    if(Rapport.component.reports[i].type == "list"){
      Rapport.dataList.push(Rapport.component.reports[i]);
    } else if(Rapport.component.reports[i].type == "diagram"){
      Rapport.dataDiagram.push(Rapport.component.reports[i]);
    } else if(Rapport.component.reports[i].type == "graph"){
      Rapport.dataGraph.push(Rapport.component.reports[i]);
    }
  }


// set current report to dummy report with index = route.id
  Rapport.route = $routeParams.id;
  if(angular.isDefinedOrNotNull(Rapport.route)){
    Rapport.currentReport = Rapport.reports[Rapport.route];
  }

  // filter logs so Rapport.logs only contains the logs in the current report interval
  var logsInReportInterval =  [];
  angular.forEach(Rapport.logs, function(log){
    if(log.timestamp >= Rapport.currentReport.content.from && log.timestamp <= Rapport.currentReport.content.to){
      logsInReportInterval.push(log);
    }
  });
  Rapport.logs = logsInReportInterval;


  // prepare graph data
	Rapport.linedata =
  {
    "ytitle": Rapport.dataGraph[0].chart.yAxis.title,
    "xtitle": Rapport.dataGraph[0].chart.xAxis.title,
    "data": []
  };

  for(var i = 0; i<Rapport.logs.length; i++){
    var plot = {
      "date": Rapport.logs[i].timestamp,
      "close": Rapport.logs[i].data[Rapport.dataGraph[0].chart.yAxis.inputID]
    };
    Rapport.linedata.data.push(plot);
  }


  // recursive function for parsing a string on the form "a, b, c" to the array[a,b,c]
  Rapport.parseElements = function(expr, array){
    if(expr.search(/\,/)!=-1){

      array.push($scope.$eval(expr.slice(0, expr.search(/\,/))));
      Rapport.parseElements(expr.slice(expr.search(/\,/)+1, expr.length), array);
    } else if(expr.length){
      array.push($scope.$eval(expr.slice(0, expr.length)));
      expr = "";
    }
    return array;
  };


  // function for parsing foumulas in charts
  // takes a string formula and a single log entry as json
  Rapport.parseChartFormula = function(formula, log){

    // finds and replaces "ID" references with corresponding number input fields
    // prepare regex
    var exp = formula;
    var regexp = "ID[0-9]+";
    var re = new RegExp(regexp, "i");

    // replaces "ID" while thesse are present. Does not throw error if corresponding input field value (log.data[id]) is undefined.
    while(exp.search(re) != -1) {
      var id = re.exec(exp)[0].slice(2);
      exp = exp.replace(re.exec(exp)[0], log.data[id]);
    }



    // Checks for HIGHEST formula. returns math.max(exp) only if all number fields are filled
    if(exp.search(/HIGHEST\(/g)!=-1){

      if(exp.search(/HIGHEST\(([^\(]+)(?=\))/i)!=-1){
        var func = exp.match(/HIGHEST\(([^\(]+)(?=\))/ig);
        func[0] = func[0].replace(/HIGHEST\(/g, "");
        var num = [];
        num = Rapport.parseElements(func[0], num);
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
        num = Rapport.parseElements(func[0], num);
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
        num = Rapport.parseElements(func[0], num);
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
        num = Rapport.parseElements(func[0], num);
        exp = exp.replace(/SUM\(([^\(]+)\)/ig, statcalcservice.sum(num));
      }else{
        // SUM function includes invalid parenthesises. ex  FUNC( (ID1*100), ID2)
        // return either empty string or error
        return exp;

      }
    }

  // return expression evaluated with $eval
  return $scope.$eval(exp);
};

  // prepare chart data
  Rapport.chartdata = {
    "ytitle": Rapport.dataDiagram[0].chart.value.title,
    "xtitle": Rapport.dataDiagram[0].chart.domain.title,
    "data": []

  };
  for(var i = 0; i<Rapport.logs.length; i++){
    var plot = {
      "label": Rapport.logs[i].data[Rapport.dataDiagram[0].chart.domain.inputID],
      "value": Rapport.parseChartFormula(Rapport.dataDiagram[0].chart.value.formula,Rapport.logs[i])
    };
    Rapport.chartdata.data.push(plot);
  }



  // Function for parsing calculations in chart/graph view
  Rapport.chartFormula = function(calculation, logs){

    // prepare regex to find and replace "ID" references with corresponding number input fields
    var exp = calculation.formula;
    var regexp = "ID[0-9]+";
    var re = new RegExp(regexp, "i");

    // Checks for SUm formula. returns math.sum(exp) only if all number fields are filled
    if(exp.search(/SUM\(/g)!=-1){
      if(exp.search(/SUM\(([^\(]+)(?=\))/i)!=-1){
        // extract the content of the formula expression as an array
        var func = exp.match(/SUM\(([^\(]+)(?=\))/ig);
        func[0] = func[0].replace(/SUM\(/g, "");
        var num = [];
        for(var i = 0; i<logs.length; i++) {
          // replaces "ID" while thesse are present. Does not throw error if corresponding input field value (log.data[id]) is undefined.
          while (func[0].search(re) != -1) {
            var id = re.exec(func[0])[0].slice(2);
            func[0] = func[0].replace(re.exec(func[0])[0], logs[i].data[id]);
          }
         // parseElements evaluates each element before pushing it to array
         num = Rapport.parseElements(func[0], num);
        }
        exp = exp.replace(/SUM\(([^\(]+)\)/ig, statcalcservice.sum(num));
      }else{
        // SUM function includes invalid parenthesises. ex  FUNC( (ID1*100), ID2)
        // return either empty string or error
        return exp;

      }
    }

    // Checks for HIGHEST formula. returns math.max(exp) only if all number fields are filled
    if(exp.search(/HIGHEST\(/g)!=-1){

      if(exp.search(/HIGHEST\(([^\(]+)(?=\))/i)!=-1){
        var func = exp.match(/HIGHEST\(([^\(]+)(?=\))/ig);
        func[0] = func[0].replace(/HIGHEST\(/g, "");
        var num = [];
        for(var i = 0; i<logs.length; i++) {
          // replaces "ID" while thesse are present. Does not throw error if corresponding input field value (log.data[id]) is undefined.
          while (func[0].search(re) != -1) {
            var id = re.exec(func[0])[0].slice(2);
            func[0] = func[0].replace(re.exec(func[0])[0], logs[i].data[id]);
          }
          // parseElements evaluates each element before pushing it to array
          num = Rapport.parseElements(func[0], num);
        }        exp = exp.replace(/HIGHEST\(([^\(]+)\)/ig, statcalcservice.highest(num));
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
        for(var i = 0; i<logs.length; i++) {
          // replaces "ID" while thesse are present. Does not throw error if corresponding input field value (log.data[id]) is undefined.
          while (func[0].search(re) != -1) {
            var id = re.exec(func[0])[0].slice(2);
            func[0] = func[0].replace(re.exec(func[0])[0], logs[i].data[id]);
          }
          // parseElements evaluates each element before pushing it to array
          num = Rapport.parseElements(func[0], num);
        }        exp = exp.replace(/LOWEST\(([^\(]+)\)/ig, statcalcservice.lowest(num));
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
        for(var i = 0; i<logs.length; i++) {
          // replaces "ID" while thesse are present. Does not throw error if corresponding input field value (log.data[id]) is undefined.
          while (func[0].search(re) != -1) {
            var id = re.exec(func[0])[0].slice(2);
            func[0] = func[0].replace(re.exec(func[0])[0], logs[i].data[id]);
          }
          // parseElements evaluates each element before pushing it to array
          num = Rapport.parseElements(func[0], num);
        }        exp = exp.replace(/AVERAGE\(([^\(]+)\)/ig, statcalcservice.average(num));
      }else{
        // AVERAGE function includes invalid parenthesises. ex  FUNC( (ID1*100), ID2)
        // return either empty string or error
        return exp;

      }
    }

    // return expression evaluated with $eval
    return $scope.$eval(exp);
  };

  // set width of list view's first column
  if(Rapport.dataList[0].calculations.length) {
    var labelLength = 0;
    angular.forEach(Rapport.dataList[0].calculations, function(calc) {
      if(calc.label.length >labelLength){
        labelLength = calc.label.length;
      }
    });
    Rapport.newWidth = (labelLength*10)+"px";
  }

  // Function for parsing column calculations in list view
  Rapport.listFormula = function(calculation, column){

    var columnValues = [],
        exp = "";

    // correct bug in builder: calculation.columns can be a string if it only has one value (should be array)
    if(Object.prototype.toString.call( calculation.columns ) === "[object String]"){
      calculation.columns = [calculation.columns];
    }
    // determine if this column is used in formula. if not, return
    angular.forEach(calculation.columns, function(kID){
      if(kID.search(column.id) != -1){

        // gather all affected column entries in an array
        angular.forEach(Rapport.logs, function(ilog) {
          columnValues.push(ilog.data[column.inputID]);
        });
      }
    });

    // return if there are no calculation on this column
    if(!columnValues.length){
      return
    }

    // use regex to evaluate the formula function type, and
    // statcalcservice helper functions to replace formula function with evaluated expression
    if(calculation.formula.search(/SUM/g)!=-1){
      exp = calculation.formula.replace(/SUM/ig, statcalcservice.sum(columnValues))
    }
    if(calculation.formula.search(/HIGHEST/g)!=-1){
      exp = calculation.formula.replace(/HIGHEST/ig, statcalcservice.highest(columnValues))

    }
    if(calculation.formula.search(/LOWEST/g)!=-1){
      exp = calculation.formula.replace(/LOWEST/ig, statcalcservice.lowest(columnValues))

    }
    if(calculation.formula.search(/AVERAGE/g)!=-1){
      exp = calculation.formula.replace(/AVERAGE/ig, statcalcservice.average(columnValues))

    }

    // return expression evaluated with $eval rounded to two decimals
    return (Math.round($scope.$eval(exp)* 100)/100)+" "+calculation.unit;
  };




}]);