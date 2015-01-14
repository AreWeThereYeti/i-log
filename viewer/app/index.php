<?php
include('php/mads/core.php');
include('php/mads/auth.php');

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

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, maximum-scale=1.0" />

      <!--[if lt IE 9]>

        <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/2.2.0/es5-shim.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/2.2.0/es5-sham.js"></script>
        <script>
          document.createElement('ng-include');
          document.createElement('ng-pluralize');
          document.createElement('d3-chart');
          document.createElement('d3Chart');
        </script>

      <![endif]-->


      <script src="scripts/libs/angular.js"></script>


      <title>I-log</title>

      <script src="//use.typekit.net/ldl1xnu.js"></script>
      <script>try{Typekit.load();}catch(e){}</script>


      <link rel="stylesheet" href="styles/main.css" />

        <style dynamic-css>
            body {
                font-family: {{$root.fontFamily}};
                font-weight : 300;
            }
            select, input, textarea {
              font-family: {{$root.fontFamily}};
            }
            p{
                font-size : {{$root.fontSize || 13}}px;
            }
        </style>

    </head>
    <body ng-controller="MainCtrl as Main">

    <div id="topheader" class="topheader">
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
      <script src="scripts/libs/angular-animate.min.js"></script>
      <script src="scripts/libs/math.js"></script>
      <script src="scripts/libs/spin.min.js"></script>

      <!--config-->
      <script src="scripts/config.js"></script>

      <!--controllers-->
      <script src="scripts/controllers/LogsOverviewCtrl.js"></script>
      <script src="scripts/controllers/RapportOverviewCtrl.js"></script>
      <script src="scripts/controllers/RapportCtrl.js"></script>
      <script src="scripts/controllers/RapportPDFCtrl.js"></script>
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

      <!-- Dialogue pane -->
      <script type="text/javascript" src="scripts/libs/jquery.js"></script>
      <script type="text/javascript" src="scripts/libs/underscore.js"></script>
      <script type="text/javascript" src="scripts/libs/moment.js"></script>
      <script src="<?= PRODUCTION ? 'http://amazon.proxy.gyldendal.dk/g.js' : 'http://test.amazon.proxy.gyldendal.dk/g.js' ?>" type="text/javascript"></script>
      <script src="<?= PRODUCTION ? 'http://amazon.components.gyldendal.dk/plugins/dialogue/main.js' : 'http://gyldendal.felskov.io/plugins/dialogue/main.js' ?>" type="text/javascript"></script>

      <!-- Initialize user-session in NodeJS proxy -->
      <script type="text/javascript">
        GSDK.User.authenticateToken({
          token: '<?= ComponentAuthentication::generateToken($_GET["userID"]); ?>',
          onComplete: function () {
            // Fetch user-data
            GSDK.Proxy.get({
              // Specify URL
              url: '<?= PRODUCTION ? 'http://userdata.gyldendal.dk/api/' : 'http://api.test.userdata.gyldendal.dk/api/' ?>Utilities.svc/GetUser',

              // Apply security
              headers: {
                'X-Security-Method': 'userdata.gyldendal.dk'
              },

              // Forward userID
              data: {
                'userID': GSDK.User.getData().UserId
              },

              // Wait for response...
              onComplete: function (response, status) {
                // Parse data
                if (status === 'ok') {
                  response = JSON.parse(response);
                  window.userData = response;
                } else {
                  window.userData = {};
                }
              }
            });
          }
        });
      </script>


    </body>
</html>
