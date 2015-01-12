<?php

	include('php/user-auth.php');

	//Initialize auth process
	$authObj = new UserAuth();

?>

<!doctype html>
<html lang="en" ng-app="gyldendalAppIlog">
<head>
	<meta charset="UTF-8">
	<title>Gyldendal | i-Log</title>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

	<!-- custom styles -->
	<link rel="stylesheet" href="css/style.css">

</head>
<body class="ng-cloak">

	<div class="container">

		<div ng-include="'app/views/partial-views/header.html'"></div>

		<div class="panel panel-default">
			<div class="panel-body">

				<div class="col-md-8 col-lg-6">

					<h4><i class="fa fa-pencil-square-o"></i> i-log titel</h4>

					<div class="form-group" ng-controller="titleCtrl">
						<input type="text" class="form-control" ng-model="service.iLogDataSource.title" placeholder="Udfyld i-loggens titel" >
					</div>
				</div>

			</div>
		</div>

		<div ng-include="'app/views/partial-views/user-input-view.html'"></div>

		<div ng-include="'app/views/partial-views/reports-view.html'"></div>

		<div ng-include="'app/views/partial-views/settings.html'"></div>

	</div>

	<!-- fonts -->
	<script type="text/javascript" src="//use.typekit.net/bbw3tjr.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>

	<!-- js libs -->
	<script src="libs/angular.min.js"></script>
	<script src="libs/angular-animate.min.js"></script>
	<script src="libs/angular-touch.min.js"></script>
	<script src="libs/angular-sanitize.min.js"></script>
	<script src="libs/ui-bootstrap-tpls-0.11.0.min.js"></script>
	<script src="libs/upload-button-btn.js"></script>

	<!-- js custom -->
	<script src="app/app.js"></script>

	<script src="app/controllers/dropDownCtrl.js"></script>
    <script src="app/filters/true-false-filter.js"></script>
    <script src="app/filters/custom-date-filter.js"></script>
	<script src="app/services/iLogData.js"></script>
	<script src="app/controllers/userInputCtrl.js"></script>
	<script src="app/controllers/settingsCtrl.js"></script>
	<script src="app/controllers/titleCtrl.js"></script>
	<script src="app/controllers/modalWindowCtrl.js"></script>
	<script src="app/controllers/saveCtrl.js"></script>
	<script src="app/controllers/userInputNumberCtrl.js"></script>
	<script src="app/controllers/userInputDataCtrl.js"></script>
	<script src="app/controllers/userInputTimeCtrl.js"></script>
	<script src="app/controllers/userInputDropdownCtrl.js"></script>
	<script src="app/controllers/userInputCheckboxCtrl.js"></script>
	<script src="app/controllers/userInputLargeTextCtrl.js"></script>
	<script src="app/controllers/reportsCtrl.js"></script>
	<script src="app/controllers/calculationsCtrl.js"></script>

</body>
</html>
