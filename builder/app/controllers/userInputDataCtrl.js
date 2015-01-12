(function() {

	angular.module('gyldendalAppIlog').controller('userInputDataCtrl', ['$scope', function($scope) {

		$scope.convertedValueToText = ConvertDataTypeToText($scope.input.data);

		$scope.SwitchDataType = function(input, newValue) {
			input.data = newValue;
			ConvertDataTypeToText(input.data);
		}

		function ConvertDataTypeToText(data) {

			switch(data) {

				case 'datetime':
					$scope.convertedValueToText = 'Dato og tid (dd:mm:yyyy, hh:mm)';
				break;

				case 'date':
					$scope.convertedValueToText = 'Dato (dd:mm:yyyy)';
				break;

				case 'time':
					$scope.convertedValueToText = 'Tid (hh:mm)';
				break;

			}
		}

	}]);

}());