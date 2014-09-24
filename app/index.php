<?php

	include('php/user-auth.php');

	//Initialize auth process
	$authObj = new UserAuth();

?>

<!doctype html>
<html lang="en" ng-app="app" ng-cloak>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
      <title>I-log</title>
      <link rel="stylesheet" href="styles/main.css" />
    </head>
    <body ng-controller="MainCtrl as Main">

    <div class="topheader">
      <h1><span class="gyldendal">Gyldendal |</span> <span class="ilog">I-log</span> debug :Path is : {{$root.showSection}}</h1>

    </div>

      <!--Spinner-->
      <div ng-show="$root.loadingView == true" class="spinner-backdrop">
        <div  class="spinner">
          <div class="spinner-container container1">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container2">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container3">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
        </div>
      </div>

      <!-- NG-view is where your view is served via the routes setup in config.js-->
      <div ng-view=""></div>

      <!--libs-->
      <script src="scripts/libs/angular.min.js"></script>
      <script src="scripts/libs/angular-resource.min.js"></script>
      <script src="scripts/libs/angular-route.min.js"></script>
      <script src="scripts/libs/math.js"></script>

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


      <!--directives-->
      <script src="scripts/directives/charts.js"></script>
      <script src="scripts/directives/datepicker.js"></script>
      <script src="scripts/directives/dialog.js"></script>
      <script src="scripts/directives/backImg.js"></script>

    </body>
</html>
