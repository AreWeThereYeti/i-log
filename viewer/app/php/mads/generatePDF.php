<?php

// Generate PDF url
$url = 'http://'. $_SERVER['HTTP_HOST'] . substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'], 'php/mads/generatePDF.php')) .'?componentID='. $_GET['componentID'] .'&userID='. $_GET['userID'] .'&timestamp='. time() .'&signature=xxx#/rapport/'. $_GET['reportID'] .'/pdf';
$outputPath = 'tmp/'. time() .'.pdf';

// Generate the PDF
shell_exec('phantomjs generatePDF.js '. escapeshellarg($url) .' '. escapeshellarg($outputPath));

// Output file for download
if (file_exists($outputPath)) {
    // Ask the browser to download the file
    header("Pragma: public");
    header("Expires: 0"); 
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
    header("Cache-Control: private", false); 
    header('Content-Type: application/pdf');
    header('Accept-Ranges: bytes');
    header('Content-Length: ' . filesize($outputPath));
    header("Content-Disposition: attachment; filename=i-log.pdf");
    header("Content-Transfer-Encoding: binary");

    // Output file
    readfile($outputPath);

    // Delete temporary file
    unlink($outputPath);

// ... Or throw error
} else {
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
    exit;
}