<?php

error_reporting(E_ERROR | E_PARSE);
include('config.php');

Class ComponentProxy {
    
    private $url;

    public function __construct() {
        $this->PrepareUrl();
        $this->RedirectUser();
    }
    
    //Create Proxy URL
    private function PrepareUrl() {
        $timestamp = time();
        $signature = hash('sha256', $_GET['componentID'].$timestamp.GYLDENDAL_COMPONENTBRIDGE_PROXYSECRET);
        
        $this->url  = GYLDENDAL_COMPONENT_PROXY_URL.'Proxy/ComponentViewer';
        $this->url .= '?userID='.$_GET['userID'];
        $this->url .= '&componentID='.$_GET['componentID'];
        $this->url .= '&componentType='.$_GET['componentType'];
        $this->url .= '&timestamp='.$timestamp;
        $this->url .= '&signature='.$signature;
    }
    
    //Forward the user
    private function RedirectUser() {
        header('HTTP/1.1301MovedPermanently');
        header('Location:'.$this->url);
    }
       
}

?>