<?php 

// Load core definitions
require_once 'core.php';

// Specify request URL
$url = USERDATA_API_URL . 'ComponentEntries.svc/Get?'. http_build_query($_GET);

// Prepare cURL-handle
$curl_handle = curl_init();

// Prepare cURL-request
curl_setopt($curl_handle, CURLOPT_URL, $url);
curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl_handle, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl_handle, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json; charset=utf-8',
    'Cache-Control: no-cache',
    'Pragma: no-cache'
));

// Setup API authentication
curl_setopt($curl_handle, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($curl_handle, CURLOPT_USERPWD, HTTP_AUTH_USER . ':' . HTTP_AUTH_PWD);

// Execute request
echo curl_exec($curl_handle);

// Clean up memory
curl_close($curl_handle);