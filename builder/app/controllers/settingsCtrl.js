(function() {

	angular.module('gyldendalAppIlog').controller('settingsCtrl', ['$scope', '$window','iLog', function($scope, $window, iLog) {

		$scope.service = iLog;

		$scope.$watch('service.iLogDataSource.settings.labelPlacement', function(value) {
			$scope.LabelPlacementText = ClientLabelText(value);
		});

		//Sets params as font name
		$scope.SelectFont = function(fontName) {
			iLog.iLogDataSource.settings.fontFamily = fontName;
		};

		//Sets params as font size
		$scope.SelectFontSize = function(sizeOfFont) {
			iLog.iLogDataSource.settings.fontSize = sizeOfFont;
		};

		//Sets params as font size
		$scope.LabelPlacement = function(placement) {
			iLog.iLogDataSource.settings.labelPlacement = placement;
			$scope.LabelPlacementText = ClientLabelText(placement);
		};

		$scope.NotImplementedAlert = function() {
			$window.alert('Not implemented yet');
		};

	    $scope.Uploaded = function(data, status) {
	    	iLog.iLogDataSource.settings.backgroundImageID = data;
	    };

		//Converts LabelPlacement text to readable text
		function ClientLabelText(value) {

			var text = '';

			switch(value) {
				case 'left':
					text = 'Venstre for input';
				break;
				case 'over':
					text = 'Over input';
				break;
			}

			return text;
		}

	}]);

}());
