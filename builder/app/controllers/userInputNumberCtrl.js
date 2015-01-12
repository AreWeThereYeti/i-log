(function() {

	angular.module('gyldendalAppIlog').controller('userInputNumberCtrl', ['$scope', function($scope) {

		//Prevent keypress if maxLength is exceeded
		$scope.RestrictToLength = function(e, maxLength) {

			if ($scope.input.label.toString().length+1 > maxLength) {
				e.preventDefault();
			}
		}

	}]);

}());