<?php

require_once __DIR__ .'/config.php';

class ComponentAuthentication {
    public static function validateSecret () {
        // Allow testing?
        if (self::allowTesting()) { return; }

        // Prepare variables to check given signature
        $tstamp = $_GET['timestamp'];
        $signature = $_GET['signature'];
        $component_id = $_GET['componentID'];

        // Make sure the secret is valid
        $valid_signature = hash('sha256', $component_id . $tstamp . COMPONENT_SECRET);
        if ($signature !== $valid_signature) {
            header('HTTP/1.0 403 Forbidden');
            die('Access denied - signature invalid');
        }

        // Verify user by session?
        if (self::hasActiveSession($signature)) { return; }

        // ... Otherwise verify that the signature is still valid (max 10
        // minutes)
        if (abs($tstamp - time()) > 600) {
            header('HTTP/1.0 403 Forbidden');
            die('Access denied - signature expired');
        }

        /** We no longer prevent the same signature to be used more than once,
         *  as it can potentially prevent legitimate users from accessing the
         *  products!

        // And verify that the signature has not been used yet
        $used_signatures = @json_decode(@file_get_contents(SIGNATURE_FILE));
        $used_signatures_update = array();

        foreach ($used_signatures as $used_signature => $used_tstamp) {
            // If this signature has already been used, then deny access
            if ($signature === $used_signature) {
                header('HTTP/1.0 403 Forbidden');
                die('Access denied - signature expired');   
            }

            // Cache signatures for max 10 minutes
            if (abs($used_tstamp - time()) <= 600) {
                $used_signatures_update[$used_signature] = $used_tstamp;
            }
        }

        // If we get here this means that the signature was valid - register that
        // it is in use now
        $used_signatures_update[$signature] = $tstamp;
        $updated_file_signatures = json_encode($updated_file_signatures);

        if(file_put_contents(SIGNATURE_FILE_PATH, json_encode($used_signatures_update)) === false) {
            error_log('Error writing signatures file.');
        }
        */

        // Register session
        $_SESSION['signatures'][$signature] = true;
    }

    public static function allowTesting () {
        // Only allow testing if explicitly requested
        if (!isset($_GET['test'])) { return false; }

        // Allow testing on certain IDs only
        $allowTesting = $_SERVER['REMOTE_ADDR'] === '192.168.33.1' || $_SERVER['REMOTE_ADDR'] === '2.107.231.102';

        // ... Or certain domains
        $allowTesting |= stripos($_SERVER['HTTP_HOST'], 'local.io') !== false || stripos($_SERVER['HTTP_HOST'], 'felskov.io') !== false || stripos($_SERVER['HTTP_HOST'], 'test.') !== false || stripos($_SERVER['HTTP_HOST'], 'dev.') !== false || stripos($_SERVER['HTTP_HOST'], 'localhost') !== false;

        if ($allowTesting && !$_GET['userID']) {
            $_GET['userID'] = 'mort088k';
        }

        // Return the result
        return $allowTesting;
    }

    public static function hasActiveSession ($signature) {
        // Start session-handling
        session_start();

        // Prepare "signature"-array
        if (!is_array($_SESSION['signatures'])) { $_SESSION['signatures'] = array(); }

        // Check if signature has already been validated?
        return !!$_SESSION['signatures'][$signature];
    }

    public static function generateToken ($userId) {
        // Generate the token
        $token = array();
        $token['UserId'] = $userId;
        $token['TimeStamp'] = time();
        $token['Secret'] = hash('sha256', $token['UserId'] . $token['TimeStamp'] . PROXY_SECRET);

        // Output encoded token
        echo base64_encode(json_encode($token));
    }

    public static function generateAuthParameters ($componentID) {
        // Prepare auth parameters
        $params = array();
        $params['componentID'] = $componentID;
        $params['timestamp'] = time();
        $params['signature'] = hash('sha256', $params['componentID'] . $params['timestamp'] . COMPONENT_SECRET);

        // Return the parameters
        return $params;
    }
}