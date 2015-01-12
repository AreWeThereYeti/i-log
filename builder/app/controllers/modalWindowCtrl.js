(function() {

	angular.module('gyldendalAppIlog').controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'item', function($scope, $modalInstance, item) {
		
		$scope.item = item;

		$scope.Ok = function () {
			
			if ($scope.item.insertedHTML !== undefined) {
				$modalInstance.close($scope.item.insertedHTML);
				return;
			}
			$modalInstance.close($scope.item.index);
		};

		$scope.Cancel = function () {
			$modalInstance.dismiss();
		};

	}]);

}());