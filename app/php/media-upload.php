<?php

	include('image-upload-class.php');

	//Prepare Image for upload
	$ImgObj = new ImageUpload($_FILES);

	//If image is valid do
	if ($ImgObj->ValidateFileImg()) {
		
		//Upload Image to Gyldendal
		$ImgObj->UploadImage();

	}

?>