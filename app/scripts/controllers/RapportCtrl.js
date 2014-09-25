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


  Rapport.listdata = [
    {
      "type": "list",
      "title": "list title",
      "columns": [
        {
          "id": 1, // ID'et på feltet som tildelt i rapporten
          "inputID": 2, // er dette id en reference til en tal række? Hvor kommer kolonne inholdet fra?
          "label": "Kolonnetitel1"
        },
        {
          "id": 2, // ID'et på feltet som tildelt i rapporten
          "inputID": 1,
          "label": "Kolonnetitel2"
        }
      ],
      "calculations": [
        {
          "title": "Beregningstitel",
          "formula": "SUM",
          "columns": [
            1,
            2
          ]
        }
      ]
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
}]);