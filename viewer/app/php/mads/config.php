<?php

// Disable error-reporting to the user
error_reporting(0);

// Global configurations
define('COMPONENT_SECRET', '327d5df2-bc8a-4233-b550-8089ac8a6e10');
define('SIGNATURE_FILE', __DIR__ .'/used_signatures.json');

// Auto-switch between dev and production environments
if (stripos($_SERVER['HTTP_HOST'], 'stage2.sl-udv.dk') !== false || stripos($_SERVER['HTTP_HOST'], 'felskov.io') !== false || stripos($_SERVER['HTTP_HOST'], 'local.io') !== false) {
    // DEV

    // Proxy configurations
    define('PROXY_SECRET', 'fd1911c6f094f6382f326a193fa6a746eb37a3bcd569e7233a12191fdbbbb75c');
    define('PROXY_URL', 'http://test.amazon.proxy.gyldendal.dk/g.js');
} else {
    // PRODUCTION

    // Proxy configurations
    define('PROXY_SECRET', 'b6f9cf442cb8402c8756df7d725eede84a6611fa1182a7c5ef2273ae2fdbd761');
    define('PROXY_URL', 'http://amazon.proxy.gyldendal.dk/g.js');
}