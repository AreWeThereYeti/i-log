<?php

	include('config.php');

	Class UserAuth {

		private $timeStamp;
		private $componentID;
		private $validSignature;
		private $receivedTimeStamp;
		private $receivedUserSignature;
		private $userAuthed = false;

		//Makes sure all required params are received and saves to instance
		public function __construct() {
		
			if (isset($_GET['componentID'], $_GET['timestamp'], $_GET['signature'])) {

				//Save GET params in class variables
				$this->SaveParams($_GET['componentID'], $_GET['timestamp'], $_GET['signature']);

				//Start session
				session_start();

				//Checks if user already has a valid session signature
				if (!$this->UserValidSession()) {

					//Generate the sha-256 signature
					$this->CreateSignature();

					//Make sure the given signature matches the newly created one exactly
					if (!$this->ValidUserSignature()) {
						$this->ForbiddenPage('Signature invalid');
					}

					//Make sure the signature is still valid
					if ($this->SignatureIsExpired() || $this->HasSignatureBeenUsedBefore()) {
						$this->ForbiddenPage('Signature expired');
					}
					else {
						$this->AddReceivedSignatureToSession();
					}

				}

				return true;
			}

			$this->ForbiddenPage('Request not valid');

		}

		private function SaveParams($c ,$t, $s) {
			$this->componentID = $c;
			$this->receivedTimeStamp = $t;
			$this->receivedUserSignature = $s;			
		}

		//Generate the sha-256 signature, as it should look
		private function CreateSignature() {

			// echo time();
			// exit;

			$this->validSignature = hash('sha256', $this->componentID . $this->receivedTimeStamp . GYLDENDAL_COMPONENTBRIDGE_SECRET);
			// echo $this->receivedTimeStamp;
			// echo '<br />'.$this->validSignature;
			// exit;
		}

		//Checks if received signature is valid
		private function ValidUserSignature() {

			if ($this->validSignature !== $this->receivedUserSignature) {
				return false;
			}
			return true;

		}

		//Checks if user already has a valid session signature
		private function UserValidSession() {

			//Prepare an array which can contain the list of signatures that has been authenticated for the current user
			if ( !is_array($_SESSION['signatures']) ) {		
				$_SESSION['signatures'] = array();
			}

			//If the given signature exists in the user's session, that means it has already been verified. Skip the process below
			if (!in_array($this->receivedUserSignature, $_SESSION['signatures'])) {
				return false;
			}
			return true;

		}

		//Make sure the signature is still valid (within plus/minus 10 minutes of current timestamp)
		private function SignatureIsExpired() {

			$currentTime = time();

			if (($this->receivedTimeStamp+(60 * LOGIN_EXPIRE_TIME)) > $currentTime && ($this->receivedTimeStamp-(60 * LOGIN_EXPIRE_TIME)) < $currentTime) {
					return false;
			}
			return true;

		}

		//Kill page with message from parametre
		private function ForbiddenPage($message) {
			header('HTTP/1.1 403 Forbidden');
			die($message);			
		}

		//Load the list of currently used signatures
		private function LoadSignaturesFromFile($file) {
			$usedSignatures = file_get_contents($file);
			return json_decode($usedSignatures);
		}

		//Store the updated signature-list
		private function StoreUsedSignaturesInFile($file, $data) {
			file_put_contents($file, json_encode($data));
		}

		//Add newly authenticated signature to the user's session, so we can allow the user to refresh the page
		private function AddReceivedSignatureToSession() {
			array_push($_SESSION['signatures'], $this->receivedUserSignature);
		}

		//Checks if json-file contains the signature if it does it's expired otherwise add signature to used list
		private function HasSignatureBeenUsedBefore() {

			$signatureHasBeenUsed = false;
			
			$usedSignatures = $this->LoadSignaturesFromFile('signatures.json');

			//Prepare a new array,in which we can re-build a list of used signatures
			$newSignatureList = array();

			//If the currently used signature exists in this array, it means that the signature has already been used and has therefore expired
			foreach ($usedSignatures as $usedSignature => $timestamp) {

				if ($usedSignature == $this->receivedUserSignature) {
					$signatureHasBeenUsed = true;
					break;
				}

				//Otherwise check to see if a signature is still valid and in that case, keep it in the list of used signatures
				if ($timestamp + (60 * LOGIN_EXPIRE_TIME) < time() ) {
					$newSignatureList[$usedSignature] = $timestamp;
				}
			}

			//Add the currently used signature to the list
			$newSignatureList[$this->receivedUserSignature] = $this->receivedTimeStamp;

			//Store the updated list in file
			$this->StoreUsedSignaturesInFile('signatures.json', $newSignatureList);
			
			return $signatureHasBeenUsed;

		}

	}

?>