"use strict";

app.controller('RapportCtrl', ['$routeParams', 'component', 'logs', '$scope', 'report', 'statcalcservice', function ($routeParams, component, logs, $scope, report, statcalcservice) {
	//Save reference to controller in order to avoid reference soup
	var Rapport = this;

  // populate Rapport.logs with all user logs for component
  if(angular.fromJson(logs.data) != "Not found") {
    Rapport.logs = angular.fromJson(logs.data.content);
  } else {
    // what happens if there is no logs?
  }

  // populate Rapport.component with all user logs for component
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

  //dummy report array as it should look after parsing
  Rapport.reports = [
    {
      created: 1414162814519,
      "from" : "1321009871",
      "to" : "1356174671",
      "title" : "Report1",
      "shared" : true
    },
    {
      created: 1414162814519,
      "from" : "1321009871",
      "to" : "1354360271",
      "title" : "Report2",
      "shared" : false
    },
    {
      created: 1414162814519,
      "from" : "1321009871",
      "to" : "1356952271",
      "title" : "Report3",
      "shared" : true
    },
    {
      created: 1414162814519,
      "from" : "1321009871",
      "to" : "1356174671",
      "title" : "Report4",
      "shared" : true
    },
    {
      created: 1414162814519,
      "from" : "1321009871",
      "to" : "1355483471",
      "title" : "Report5",
      "shared" : true
    }
  ];

// set current report to dummy report with index = route.id
  Rapport.route = $routeParams.id;
  if(angular.isDefinedOrNotNull(Rapport.route)){
    Rapport.currentReport = Rapport.reports[Rapport.route];
  }

// dummy component data for testing
  Rapport.dummy = [
    {
      "id":1,
      "type":"list",
      "title":"report title",
      "columns":[
        {
          "id":"K1",
          "inputID":1,
          "label":"number"
        },
        {
          "id":"K2",
          "inputID":2,
          "label":"33"
        }
      ],
      "calculations":[
        {
          "label":"Total",
          "formula":"SUM",
          "unit":"km",
          "columns":[

            "K2,K1"
          ]
        },
        {
          "label":"Gennemsnit x2",
          "formula":"AVERAGE*2",
          "unit":"km",
          "columns":[
            "K2"
          ]
        }
      ]
    },
    {
      "id":1410335640193,
      "title":"Test af ny rapport type",
      "type":"diagram",
      "views":
      {
        "piechart":true,
        "barchart":true
      },
      "chart":
      {
        "domain":
        {
          "input":2,
          "title":"x-akse"
        },
        "value":
        {
          "formula":"ID2%6",
          "title":"SUM(ID2)+200"
        },
        "calculations":[
          {
            "label":"SUM(ID2)+ID50",
            "formula":"SUM(ID2)+ID50",
            "unit":"m"
          }
        ]
      }
    },
    {
      "id":1410596140878,
      "title":"Min vilde gra",
      "type":"graph",
      "views":
      {
        "scatterPlot":true,
        "connectedGraph":true
      },
      "chart":
      {
        "xAxis":
        {
          "title":"X akse label",
          "showDate":true
        },
        "yAxis":
        {
          "inputID":"3",
          "title":"Y-akse label"
        },
        "calculations":[
          {
            "label":"SUM(ID2)",
            "formula":"SUM(ID2)",
            "unit":"m"
          },
          {
            "label":"AVERAGE(ID2)",
            "formula":"AVERAGE(ID2)",
            "unit":"km"
          }
        ]
      }
    }
  ];


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
      "close": Rapport.logs[i].data[2/*Rapport.dataGraph[0].chart.yAxis.inputID*/]
    };
    Rapport.linedata.data.push(plot);
  }

	//Test variable. If you see it when the app runs you are good to go
	Rapport.testVar = 'We are up and running  on rapports overview -page!';

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
    "ytitle": Rapport.dummy[1].chart.value.title,
    "xtitle": Rapport.dummy[1].chart.domain.title,
    "data": []

  };
  for(var i = 0; i<Rapport.logs.length; i++){
    var plot = {
      "label": Rapport.logs[i].data[Rapport.dummy[1].chart.domain.input],
      "value": Rapport.parseChartFormula(Rapport.dummy[1].chart.value.formula,Rapport.logs[i])
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