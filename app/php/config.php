<?php
//Static username and shared secret (this is the same in both test and production)
define('GYLDENDAL_COMPONENTAPI_USER', 'appear');
define('GYLDENDAL_COMPONENTAPI_SECRET', '489d9cab-97c5-4cbb-b30d-97dd07d9816e');

define('GYLDENDAL_COMPONENTBRIDGE_SECRET', '327d5df2-bc8a-4233-b550-8089ac8a6e10');

//Time in minutes when a signature expires
define('LOGIN_EXPIRE_TIME', 10);

if ($_SERVER['HTTP_HOST'] === 'local.components.gyldendal.dk' || $_SERVER['HTTP_HOST'] === 'stage2.sl-udv.dk' || $_SERVER['HTTP_HOST'] === 'localhost:8888' || $_SERVER['HTTP_HOST'] === 'clients.envisage.dk') {
	define('GYLDENDAL_COMPONENTAPI_URL', 'http://bridge.test.components.gyldendal.dk/api/');   
}
else {
	define('GYLDENDAL_COMPONENTAPI_URL', 'http://bridge.components.gyldendal.dk/api/');
}

?>

http://localhost:8888/?componentID=540025f23c5b5a07d0570c53&timestamp=1411557484&signature=85d21e33cbbf24ac6efffce20be93295db124337d6469e987c4c6c95bb606345