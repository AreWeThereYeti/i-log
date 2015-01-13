<?php

// Ask the browser to download the file
header("Pragma: public");
header("Expires: 0"); 
header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
header("Cache-Control: private", false); 
header('Content-Type: text/csv');
header('Accept-Ranges: bytes');
header('Content-Length: ' . strlen($_POST['csv']));
header("Content-Disposition: attachment; filename=i-log.csv");

// Output file
echo $_POST['csv'];