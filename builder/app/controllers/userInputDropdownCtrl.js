(function() {

	angular.module('gyldendalAppIlog').controller('userInputDropdownCtrl', ['$scope', '$modal', function($scope, $modal) {
		
		//If options are empty show 1 otherwise not possible to add new inputs
		$scope.input.options = $scope.input.options.length === 0 ? [''] : $scope.input.options;

		//Move input up
		$scope.MoveOptionUp = function($index) {

			if ($index > 0) {
				var thisInput = $scope.input.options[$index];

				$scope.input.options.splice($index, 1);
				$scope.input.options.splice($index-1, 0, thisInput);
			}

		};

		//Move input down
		$scope.MoveOptionDown = function($index) {

			if ($index !== $scope.input.options.length-1) {

				var thisInput = $scope.input.options[$index];

				$scope.input.options.splice($index, 1);
				$scope.input.options.splice($index+1, 0, thisInput);
			}

		};

		//Add new option input
		$scope.AddNewOptionInput = function($index) {
			

			//If index is not defined add to end of array
			if ($index === undefined) {
				$scope.input.options.push('');
				return;
			}

			$scope.input.options.splice($index, 0, '');
		}

		//Modal confirmation for deletion
		$scope.DeleteOptionInput = function($index) {

			//Prevent deletion if only one item is present
			if ($scope.input.options.length === 1) {
				return;
			}

			var modalText = {
				modalTitle: 'Slet input',
				modalText: 'Er du sikker på at du vil slette denne valgmulighed?',
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
				$scope.input.options.splice(selectedItemIndex,1);
			});

		};


	}]);

}());