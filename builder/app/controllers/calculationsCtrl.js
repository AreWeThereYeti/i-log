(function() {

	angular.module('gyldendalAppIlog').controller('calculationsCtrl', ['$scope', '$modal', 'iLog', function($scope, $modal, iLog) {

		//Modal confirmation for deletion
		$scope.DeleteInput = function(field, $index) {

			var modalText = {
				modalTitle: 'Slet beregning',
				modalText: 'Er du sikker på at du vil slette denne beregning?',
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
				field.calculations.splice(selectedItemIndex,1);
			});

		};

		//Move input up
		$scope.MoveSourceUp = function(field, $index) {

			if ($index > 0) {
				var thisCalculationInput = field.calculations[$index];

				field.calculations.splice($index, 1);
				field.calculations.splice($index-1, 0, thisCalculationInput);
			}

		};

		//Move input down
		$scope.MoveSourceDown = function(field, $index) {

			if ($index !== field.calculations.length-1) {
				var thisCalculationInput = field.calculations[$index];

				field.calculations.splice($index, 1);
				field.calculations.splice($index+1, 0, thisCalculationInput);
			}

		};

		//Adds calculations row based on index and type
		$scope.AddCalcInputAtIndex = function(field, calcType, $index) {
			
			var calcObj = CreateCalcObjFromType(calcType)

			//Add to end of array
			if ($index === undefined) {
				field.calculations.push(calcObj);
				return;
			}


			field.calculations.splice($index, 0, calcObj);
			
		}

		function CreateCalcObjFromType(reportType) {

			var newCalcObj = {
				label: null,
				formula: null
			}

			switch (reportType) {
				case 'list':
					newCalcObj.columns = [];
				break;

				case 'diagram':
					newCalcObj.unit = null;
				break;

			}

			return newCalcObj;
		}

	}]);

}());