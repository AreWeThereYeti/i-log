<?php 

$componentid = '540025f23c5b5a07d0570c53';
$timestamp = time();
$signature = hash('sha256', $componentid . $timestamp . '327d5df2-bc8a-4233-b550-8089ac8a6e10');
$url = "?componentID=$componentid&timestamp=$timestamp&signature=$signature";

?>


<!doctype html>
<html lang="en" ng-app="gyldendalApp">
<head>
	<meta charset="UTF-8">
	<title>Document</title>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

	<!-- custom styles -->
	<link rel="stylesheet" href="../css/style.css">

</head>
<body>

	<div class="container">

		<header>
			<h1 class="pull-left"><span class="pipe">Gyldendal</span> <span class="red-text">i-log</span></h1>
			<img class="logo" src="../img/logo.png">			
		</header>


		<div class="panel panel-default">
			<div class="panel-body">
			<h4>i-Guide signature-generator</h4>

			<p>This url is valid for 10 minutes</p>

			<a href="../<?php echo $url ?>">Valid URL</a>

			<hr>

			<h5>componentId:</h5>
			<p><?php echo $componentid ?></p>

			<h5>timestamp:</h5>
			<p><?php echo $timestamp ?></p>

			<h5>signature:</h5>
			<p><?php echo $signature ?></p>

			</div>
		</div>

</body>
</html>