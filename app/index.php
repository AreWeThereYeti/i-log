<?php
include('php/mads/core.php');

?>

<!--//
//	include('php/user-auth.php');
//
//	//Initialize auth process
//	$authObj = new UserAuth();
//
//-->

<!doctype html>
<html lang="en" id="ng-app" ng-app="app" ng-cloak>
    <head>
      <!--[if IE 8]>
        <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/2.2.0/es5-shim.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/2.2.0/es5-sham.js"></script>

          <script>
            document.createElement('ng-include');
            document.createElement('ng-pluralize');
            document.createElement('d3-chart');
          </script>

      <![endif]-->

      <script src="scripts/libs/angular.js"></script>

      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
      <title>I-log</title>

      <script src="//use.typekit.net/ldl1xnu.js"></script>
      <script>try{Typekit.load();}catch(e){}</script>


      <link rel="stylesheet" href="styles/main.css" />

        <style dynamic-css>
            body {
                font-family: {{$root.fontFamily}};
                font-weight : 300;
            }
            select {
              font-family: {{$root.fontFamily}};
            }
            p{
                font-size : {{$root.fontSize || 13}}px;
            }
        </style>

    </head>
    <body ng-controller="MainCtrl as Main">

    <div class="topheader">
      <h1><span class="gyldendal">Gyldendal |</span> <span class="ilog">I-log</span></h1>
    </div>

      <!--Spinner-->
      <div ng-show="$root.loadingView == true" class="spinner-backdrop">

        <div us-spinner="{radius:25, width:2, length: 6, lines: 20}">

        </div>
      </div>

      <!-- NG-view is where your view is served via the routes setup in config.js-->
      <div ng-view=""></div>

      <!--libs-->
      <script src="scripts/libs/angular-resource.min.js"></script>
      <script src="scripts/libs/angular-route.min.js"></script>
      <script src="http://code.angularjs.org/1.2.26/angular-animate.min.js"></script>
      <script src="scripts/libs/math.js"></script>
      <script src="scripts/libs/spin.min.js"></script>

      <!--config-->
      <script src="scripts/config.js"></script>

      <!--controllers-->
      <script src="scripts/controllers/LogsOverviewCtrl.js"></script>
      <script src="scripts/controllers/RapportOverviewCtrl.js"></script>
      <script src="scripts/controllers/RapportCtrl.js"></script>
      <script src="scripts/controllers/LogCtrl.js"></script>
      <script src="scripts/controllers/MainCtrl.js"></script>
      <script src="scripts/controllers/ReportMenubarCtrl.js"></script>
      <script src="scripts/controllers/DatePickerCtrl.js"></script>
      <script src="scripts/controllers/DialogCtrl.js"></script>
      <script src="scripts/controllers/LogMenubarCtrl.js"></script>

      <!--Component/template controllers-->
      <script src="scripts/controllers/MenubarCtrl.js"></script>
      <script src="scripts/controllers/FilterbarCtrl.js"></script>

      <!--services-->
      <script src="scripts/services/getdataservice.js"></script>
      <script src="scripts/services/d3service.js"></script>
      <script src="scripts/services/dateservice.js"></script>
      <script src="scripts/services/statcalcservice.js"></script>

      <!--filters-->
      <script src="scripts/filters/logRangeFilter.js"></script>
      <script src="scripts/filters/reportRangeFilter.js"></script>


    <!--directives-->
      <script src="scripts/directives/charts.js"></script>
      <script src="scripts/directives/datepicker.js"></script>
      <script src="scripts/directives/dialog.js"></script>
      <script src="scripts/directives/backImg.js"></script>
      <script src="scripts/directives/hideFilterDirective.js"></script>
      <script src="scripts/directives/globalCss.js"></script>
      <script src="scripts/directives/angular-spinner.min.js"></script>

    </body>
</html>
