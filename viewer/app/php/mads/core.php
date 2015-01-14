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

// Determine if we're currently in production-mode or not
define('PRODUCTION', stripos($_SERVER['HTTP_HOST'], 'localhost') === false && stripos($_SERVER['HTTP_HOST'], 'gyldendal.local.io') === false && stripos($_SERVER['HTTP_HOST'], 'gyldendal.felskov.io') === false && stripos($_SERVER['HTTP_HOST'], 'test.') === false && stripos($_SERVER['HTTP_HOST'], 'dev.') === false);

// Define API endpoint URL
define('USERDATA_API_URL', PRODUCTION ? 'http://userdata.gyldendal.dk/api/' : 'http://api.test.userdata.gyldendal.dk/api/');

// All requests must not be cached!
header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header('Pragma: no-cache');