(function() {

	angular.module('gyldendalAppIlog').controller('userInputCheckboxCtrl', ['$scope', function($scope) {

		//Set Input prechecked from param
		$scope.IsPreChecked = function(thisInput, bool) {
			thisInput.prechecked = bool;
		}

	}]);

}());