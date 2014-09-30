<?php

	error_reporting(E_ERROR | E_PARSE);

	include('config.php');

	Class ComponentData {

		private $url;

		public function __construct() {

		}

		//Save Component
		public function SaveComponent() {
            
//            $content = json_encode($_POST['Content']);
//                
//			$postBody = json_encode(array(
//				'ID'=>$_POST['ID'],
//			    'Title'=>$_POST['Title'],
//			    'Content'=>$content
//			));
            
            $postBody = $_POST['data'];

			//Prepare request data
			$this->url = GYLDENDAL_COMPONENTAPI_URL.'Components/Update';

			//Prepare authentication data
			$timestamp = time();
			$signature = hash('sha256', $this->url.md5($postBody).$timestamp. GYLDENDAL_COMPONENTAPI_SECRET);
			$signature = base64_encode(GYLDENDAL_COMPONENTAPI_USER.':'.$signature);

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $this->url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				'Cache-Control: no-cache',
				'Pragma: no-cache',
				'Content-Type: application/json; charset=utf-8',
				'Authorization: GU-HMAC '.$signature,
				'UnixUtc: '.$timestamp
			));

			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $postBody);

			$response = curl_exec($ch);
			curl_close($ch);

			echo $response;

		}

		//Load Component
		public function LoadComponent() {

			//Prepare request data
			$this->url = GYLDENDAL_COMPONENTAPI_URL.'Components/Get/'.$_GET['componentID'];

			//Prepare authentication data
			$timestamp = time();
			$signature = hash('sha256',$this->url.md5('').$timestamp. GYLDENDAL_COMPONENTAPI_SECRET);
			$signature = base64_encode(GYLDENDAL_COMPONENTAPI_USER.':'.$signature);

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $this->url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER,array(
				'Cache-Control: no-cache',
				'Pragma: no-cache',
				'Content-Type: application/json; charset=utf-8',
				'Authorization: GU-HMAC '.$signature,
				'UnixUtc: '.$timestamp
			));

			$response = curl_exec($ch);

			curl_close($ch);

			echo $response;

		}

	}

?>