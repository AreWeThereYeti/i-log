(function() {

	angular.module('gyldendalAppIlog').controller('userInputTimeCtrl', ['$scope', function($scope) {

		$scope.convertedValueToText = $scope.input.data;

		$scope.SwitchDataType = function(input, newValue) {
			input.data = newValue;
			$scope.convertedValueToText = input.data;
		}

	}]);

}());
