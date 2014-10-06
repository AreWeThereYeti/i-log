"use strict";

app.controller('RapportCtrl', ['component', 'logs', '$scope', 'report', 'statcalcservice', function (component, logs, $scope, report, statcalcservice) {
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

	Rapport.data = [
		{
			"letter": "A",
			"frequency": 5
		}, {
			"letter": "B",
			"frequency": 20
		}, {
			"letter": "C",
			"frequency": 10
		}, {
			"letter": "D",
			"frequency": 40
    }
	];

  /*Rapport.listdata = [
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

            "K2"
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
          "input":null,
          "title":"hej"
        },
        "value":
        {
          "formula":"min formel",
          "title":"hej2"
        },
        "calculations":[
          {
            "label":"calcTitel",
            "formula":"calc1",
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
        "connectedGraph":false
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
          "title":"Y-akse label som jeg har valgt"
        },
        "calculations":[
          {
            "label":"Sum af 1 + 2",
            "formula":"SUM(1+2)",
            "unit":"m"
          },
          {
            "label":"Sum af 3 + 4",
            "formula":"SUM(3+4)",
            "unit":"km"
          }
        ]
      }
    }
  ];*/



	Rapport.piedata = [
		{
			"label": "Den første",
			"value": 5
		}, {
			"label": "Awesome",
			"value": 20
		}, {
			"label": "Awesome",
			"value": 10
		}, {
			"label": "Nummer",
			"value": 40
		}, {
			"label": "AwesomeAwesomeAwesome",
			"value": 5
		}, {
			"label": "AwesomeAwesome",
			"value": 20
		}
	];

	Rapport.linedata =
  {
    "ytitle": "Y-akse titel",
    "xtitle": "X-akse titel",
    "data":
    [
      {
        "date": "1-May-12",
        "close": 16
      }, {
        "date": "30-Apr-12",
        "close": 20
      }, {
        "date": "27-Apr-12",
        "close": 15
      }, {
        "date": "25-Apr-12",
        "close": 20
      }, {
        "date": "19-Apr-12",
        "close": 15
      }, {
        "date": "12-Apr-12",
        "close": 5
      }
	  ]
  };

	//Test variable. If you see it when the app runs you are good to go
	Rapport.testVar = 'We are up and running  on rapports overview -page!';

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
      if(kID == column.id){

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

    // return expression evaluated with $eval
    return $scope.$eval(exp)+" "+calculation.unit;
  };




}]);