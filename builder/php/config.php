<?php

//Static username and shared secret (this is the same in both test and production)
define('GYLDENDAL_COMPONENTAPI_USER', 'appear');
define('GYLDENDAL_COMPONENTAPI_SECRET', '489d9cab-97c5-4cbb-b30d-97dd07d9816e');

define('GYLDENDAL_COMPONENTBRIDGE_SECRET', '327d5df2-bc8a-4233-b550-8089ac8a6e10');

//Proxy secret
define('GYLDENDAL_COMPONENTBRIDGE_PROXYSECRET', 'ad41d867-771b-4ec8-afb2-f39728835364');

//Time in minutes when a signature expires
define('LOGIN_EXPIRE_TIME', 10);

if (stripos($_SERVER['HTTP_HOST'], 'stage2.sl-udv.dk') !== false || stripos($_SERVER['HTTP_HOST'], 'felskov.io') !== false || stripos($_SERVER['HTTP_HOST'], 'local.io') !== false || stripos($_SERVER['HTTP_HOST'], 'localhost') !== false || stripos($_SERVER['HTTP_HOST'], 'clients.envisage.dk') !== false) {
	define('GYLDENDAL_COMPONENTAPI_URL', 'http://bridge.test.components.gyldendal.dk/api/');
    define('GYLDENDAL_COMPONENT_PROXY_URL', 'http://bridge.test.components.gyldendal.dk/');
}
else {
	define('GYLDENDAL_COMPONENTAPI_URL', 'http://bridge.components.gyldendal.dk/api/');
    define('GYLDENDAL_COMPONENT_PROXY_URL', 'http://bridge.test.components.gyldendal.dk/');
}

?>
