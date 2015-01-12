(function() {

	angular.module('gyldendalAppIlog').controller('userInputCtrl', ['$scope', '$modal', 'iLog', function($scope, $modal, iLog) {

		$scope.service = iLog;
		$scope.service.iLogDataSource.inputs = $scope.service.iLogDataSource.inputs;

		//Modal confirmation for deletion
		$scope.DeleteInput = function($index) {

			var modalText = {
				modalTitle: 'Slet input',
				modalText: 'Er du sikker på at du vil slette dette input felt?',
				modalTextCancel: 'Annuller',
				modalTextConfirm: 'Slet',
				index: $index
			}

			//Instantiate new modal
			var modalInstance = $modal.open({
					templateUrl: 'app/views/partial-views/modalDeleteConfirmation.html',
					controller: 'ModalInstanceCtrl',
					resolve: {
						item: function () {
							return modalText;
						}
					}
				});

			//Delete input from array
			modalInstance.result.then(function (selectedItemIndex) {
				/*$scope.service.iLogDataSource.inputs.splice(selectedItemIndex,1);*/
                $scope.service.iLogDataSource.inputs.splice(selectedItemIndex,1);
			});

		};

		//Move input up
		$scope.MoveSourceUp = function($index) {

			if ($index > 0) {
				var thisInput = $scope.service.iLogDataSource.inputs[$index];

				$scope.service.iLogDataSource.inputs.splice($index, 1);
				$scope.service.iLogDataSource.inputs.splice($index-1, 0, thisInput);
			}

		};

		//Move input down
		$scope.MoveSourceDown = function($index) {

			if ($index !== $scope.service.iLogDataSource.inputs.length-1) {
				var thisInput = $scope.service.iLogDataSource.inputs[$index];

				$scope.service.iLogDataSource.inputs.splice($index, 1);
				$scope.service.iLogDataSource.inputs.splice($index+1, 0, thisInput);
			}

		};

		//Set Input requirement from param
		$scope.IsRequired = function(thisInput, bool) {
			thisInput.required = bool;
		}

		//Add new input type at index
		$scope.AddInputAtIndex = function($index, type) {


			//If type is not defined add of same type as index
			if (type === undefined) {
				type = $scope.service.iLogDataSource.inputs[$index].type;
			}

			var input = ConstructInputDataFromType(type);

			$scope.service.iLogDataSource.inputs.splice($index, 0, input);
		}

		//Converts boolean value to text (Ja/Nej)
		$scope.ConvertBoolToDKKText = function(boolValue) {
			return boolValue === true ? 'Ja' : 'Nej';
		}

		//Creates an input obj and appends properties by input type
		function ConstructInputDataFromType(inputType) {

			var input = {
				id: CreateNewId(),
				type: inputType,
				label: null
			}

			switch(inputType) {

				case 'text':
				case 'number':
					input.unit = null;
					input.required = false;
					input.maxChars = "";
				break;

				case 'data':
					input.data = null;
				break;

				case 'formula':
					input.formula = null;
				break;

				case 'checkbox':
					input.prechecked = false;
				break;

				case 'dropdown':
					input.required = false;
					input.options = [];
				break;

				case 'largetext':
					input.required = false;
					input.width = null;
					input.height = null;
				break;

			}

			return input;

		}

		//Converts input type to text
		$scope.ConvertInputTypeToText = function(inputType) {

			var typeText;

			switch(inputType) {

				case 'text':
					typeText = 'Tekstinput';
				break;

				case 'data':
					typeText = 'Datafelt';
				break;

				case 'formula':
					typeText = 'Beregning';
				break;

				case 'number':
					typeText = 'Talinput';
				break;

				case 'checkbox':
					typeText = 'Checkbox';
				break;

				case 'dropdown':
					typeText = 'Dropdown';
				break;

				case 'largetext':
					typeText = 'Tekstfelt';
				break;

				case 'time':
					typeText = 'Tidsinput';
				break;

			}

			return typeText;
		}

		//Converts current input (at index) to new data type (empties data values except id)
		$scope.SwichInputToNewType = function($index, newType) {

			var currentInput = $scope.service.iLogDataSource.inputs[$index];

			$scope.service.iLogDataSource.inputs.splice($index, 1);

			var input = ConstructInputDataFromType(newType);
			input.id = currentInput.id;

			$scope.service.iLogDataSource.inputs.splice($index, 0, input);

		}

		//Return html template for specific input type
		$scope.InputTemplate = function(input) {
			return 'app/views/partial-views/inputs/user-input-'+input.type+'-view.html';
		}

		//Prevents keypress if not a number
		$scope.RestrictToNumbers = function(e) {

			var charCode = (e.which) ? e.which : e.keyCode;

			if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
				e.preventDefault();
			}

		}

		//Prevent keypress if maxLength is exceeded
		$scope.RestrictToLength = function(e, $index, maxLength) {

			if ($scope.service.iLogDataSource.inputs[$index].label.toString().length+1 > maxLength) {
				e.preventDefault();
			}
		}

		//Check highest id and creates new
		function CreateNewId() {

			var newId;
			var highestId = 0;

			for (var i = 0; i < $scope.service.iLogDataSource.inputs.length; i++) {

				highestId = $scope.service.iLogDataSource.inputs[i].id > highestId ? $scope.service.iLogDataSource.inputs[i].id : highestId;

			};

			return newId = highestId+1;

		}

	}]);

}());
