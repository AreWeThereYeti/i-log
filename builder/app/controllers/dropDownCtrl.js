(function() {

	angular.module('gyldendalAppIlog').controller('dropDownToggleCtrl', ['$scope', function($scope) {

		$scope.status = {
			isopen: false
		};

		$scope.PreventDropdownIfNotActive = function(thisTabActive) {

			if (!thisTabActive) {
				$scope.status.isopen = true;
			}

		}

		$scope.toggleDropdown = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.status.isopen = !$scope.status.isopen;
		};

	}]);

}());