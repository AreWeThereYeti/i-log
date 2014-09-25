"use strict";

app.controller('RapportCtrl', ['report', function (report) {
	//Save reference to controller in order to avoid reference soup
	var Rapport = this;

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

  Rapport.dummylogs = [
    {
      "timestamp":1411645441874,
      "data":
      {
        "1":"Noget tekst",
        "2":28,
        "3":"datetime",
        "4":14,
        "5":"test",
        "6":true,
        "7":"LAAANG tekst"
      }
    },
    {
      "timestamp":1411645646885,
      "data":
      {
        "1":"Noget tekst2",
        "2":10,
        "3":"datetime",
        "4":5,
        "5":"test",
        "6":true,
        "7":"LAAANG tekst"
      }
    },
    {
      "timestamp":1411645441874,
      "data":
      {
        "1":"Noget tekst3",
        "2":8,
        "3":"datetime",
        "4":1,
        "5":null,
        "6":true,
        "7":"LAAANG tekst"
      }
    }

  ];

  Rapport.listdata = [
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
            "K1",
            "K2"
          ]
        },
        {
          "label":"Gennemsnit x2",
          "formula":"AVERAGE*2",
          "unit":"km",
          "columns":[
            "K1"
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
  ];



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

  var listFormula = function(formula){

    // determine columns used un formula

    // gather all affected column entries in an array

    // use regex to evaluate the formula function type

    // use statcalcservice helper functions to replace formula function with evaluated expression

    // return expression evaluated with $eval
  };




}]);