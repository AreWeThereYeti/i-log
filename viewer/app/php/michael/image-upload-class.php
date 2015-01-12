<?php

	error_reporting(E_ERROR | E_PARSE);

	include('config.php');

	Class ImageUpload {

		public $file;

		public function __construct($file) {
			if (!empty($file)) {
				$this->file = $file['uploadFile'];			
			}
		}

		//Validates the mimetype is jpeg, png or gif and checks if dimensions of image is valid
		public function ValidateFileImg() {

			$validFormats = array('jpeg', 'jpeg', 'png', 'gif');
			$valid = false;
			$filePath = $this->file['tmp_name'];

			foreach ($validFormats as $format) {
				if (strpos($this->file['type'], $format)) {

					if ( getimagesize($filePath) ) {
						$valid = true;
					}
					break;
				}
			}

			return $valid;

		}

		//Upload Image to Gyldendal
		public function UploadImage() {

			//Prepare request data
			$url = GYLDENDAL_COMPONENTAPI_URL.'Media/Add';

			//Prepare authentication data
			$timestamp = time();
			$signature = hash('sha256',$url.md5('').$timestamp. GYLDENDAL_COMPONENTAPI_SECRET);
			$signature = base64_encode(GYLDENDAL_COMPONENTAPI_USER.':'.$signature);

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER,array(
				'Cache-Control: no-cache',
				'Pragma: no-cache',
				'Content-Type: multipart/form-data',
				'Authorization: GU-HMAC '.$signature,
				'UnixUtc: '.$timestamp
			));

			//Ask cURL to upload the file
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, array(
				'media'=>'@'.$this->file['tmp_name'].';type=image/jpeg'
			));

			$response = curl_exec($ch);
			curl_close($ch);

			//Parse response from Media API
			$response = json_decode($response, true);

			echo $response[0]['ID'];		
		}

	}

?>