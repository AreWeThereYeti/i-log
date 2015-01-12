(function() {

	angular.module('gyldendalAppIlog').controller('userInputLargeTextCtrl', ['$scope', function($scope) {

		//Prevent keypress if maxLength is exceeded
		$scope.RestrictToLength = function(e, maxLength) {
			
			if (e.srcElement.value.toString().length+1 > maxLength) {
				e.preventDefault();
			}
		}

	}]);

}());