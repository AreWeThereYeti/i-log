<?php

// Setup error-reporting
error_reporting(E_ERROR | E_WARNING);

// Check user session (make sure he's signed in, otherwise deny access to these
// proxies!!!)
session_start();
//if (!$_SESSION['auth']) { die('Access forbidden'); }

// Setup authentication details
define('HTTP_AUTH_USER', 'test01');
define('HTTP_AUTH_PWD', 'G2d4My82y18HT72K');

// Define local host address (change this for whatever your local environment
// runs on to allow automatic determination of whether to use dev or production
// API)
define('HTTP_LOCAL_HOST', 'localhost:8888');
//define('HTTP_LOCAL_HOST', 'jonasyazid.dk');

// Define API endpoint URL
define('USERDATA_API_URL', (stripos($_SERVER['HTTP_HOST'], HTTP_LOCAL_HOST) === false) ? 'http://userdata.gyldendal.dk/api/' : 'http://api.test.userdata.gyldendal.dk/api/');

// All requests must not be cached!
header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header('Pragma: no-cache');