(function() {

	angular.module('gyldendalAppIlog').controller('saveCtrl', ['$scope', '$modal','iLog', function($scope, $modal, iLog) {

		//Save data
		$scope.SaveToService = function(openViewer) {

			if (iLog.iLogDataSource.title.length > 0) {
				var jsonData = angular.toJson(iLog.GetData());

				iLog.SaveComponent(jsonData).success(function(data, status) {

					alert('i-log gemt');

					if (openViewer) {

						var componentID = iLog.GetComponentId();
						var type = iLog.iLogDataSource.type;
						//var userID = iLog.iLogDataSource.userID;
						var userID = 'devx0001';

						var url = 'php/component-proxy.php?componentID='+componentID+'&componentType='+type+'&userID='+userID;

						location.href = url;
					}

				});
				return;
			}
			alert('Du har ikke angivet en titel, og kan derfor ikke gemme i-log.');

		};

		$scope.CancelSave = function() {

			var settings = {
				modalTitle: 'Er du sikker',
				modalText: 'Hvis du sletter siden kan den ikke genskabes.',
				modalTextCancel: 'Annuller',
				modalTextConfirm: 'Ja, slet siden'
			};

			//Instantiate new modal
			var modalInstance = $modal.open({
					templateUrl: 'app/views/partial-views/modalDeleteConfirmation.html',
					controller: 'ModalInstanceCtrl',
					resolve: {
						item: function () {
							return settings;
						}
					}
				});

			//Cancel all changes
			modalInstance.result.then(function () {
				location.reload();
			});
		};

	}]);

}());
