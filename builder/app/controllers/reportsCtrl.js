(function() {

	angular.module('gyldendalAppIlog').controller('reportsCtrl', ['$scope', '$modal', 'iLog', function($scope, $modal, iLog) {

		//Run when instantiated
		function Init() {

			$scope.service = iLog;
			$scope.reports = $scope.service.iLogDataSource.reports;

			if ($scope.reports.length === 0) {
				return;
			}

			$scope.ActivateTab(0);
		}

		//Convert type to text
		$scope.ConvertTypeToText = function(typeName) {

			var newTypeName;

			switch(typeName) {
				case 'list':
					newTypeName = 'Liste';
				break;

				case 'diagram':
					newTypeName = 'Diagram';
				break;

				case 'graph':
					newTypeName = 'Graf';
				break;

			}

			return newTypeName;

		}

		//Move tab back
		$scope.MoveTabBack = function($index) {

			if ($index > 0) {
				var thisReport = $scope.reports[$index];

				$scope.reports.splice($index, 1);
				$scope.reports.splice($index-1, 0, thisReport);
				$scope.ActivateTab($index-1);
			}

		};

		//Move tab forward
		$scope.MoveTabForward = function($index) {

			if ($index !== $scope.reports.length-1) {
				var thisReport = $scope.reports[$index];

				$scope.reports.splice($index, 1);
				$scope.reports.splice($index+1, 0, thisReport);
				$scope.ActivateTab($index+1);
			}

		};

		//Delete report
		$scope.DeleteReport = function($index) {

			//Prevents user from deleting report if its the last available
			if ($scope.reports.length === 1) {
				return;
			}

			var modalText = {
				modalTitle: 'Slet rapport',
				modalText: 'Er du sikker på at du vil slette denne rapport felt?',
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
				$scope.reports.splice(selectedItemIndex,1);

				var activeIndex = selectedItemIndex < $scope.reports.length ? selectedItemIndex : $scope.reports.length-1;

				$scope.ActivateTab(activeIndex);
			});
		}

		//Add new report
		$scope.AddReport = function(newReportType) {

			var newReportObj = CreateReportObjFromType(newReportType);

			$scope.reports.push(newReportObj);
			$scope.ActivateTab($scope.reports.length-1);

		}

		//Create new report object based on type
		function CreateReportObjFromType(reportType) {

			var uniqueId = new Date().getTime();

			var newReportObj = {
				id: uniqueId,
				title: null,
				type: reportType
			}

			switch(reportType) {
				case 'list':
					newReportObj.columns = [{
						id: CreateNewId('K', false),
						inputID: null,
						label: null,
					}];

					newReportObj.calculations = [
							{
								formula: null,
								unit: null,
								columns: []
							}
						]
				break;

				case 'diagram':
					newReportObj.views = {
						piechart: false,
						barchart: false
					}

					newReportObj.chart = {
						domain : {
							input: null,
							title: null
						},
						value : {
							formula: null,
							title: null,
						},
						calculations: [
							{
								label: null,
								formula: null,
								unit: null
							}
						]
					}
				break;

				case 'graph':
					newReportObj.views = {
						scatterPlot: false,
						connectedGraph: false
					}

					newReportObj.chart = {
						xAxis : {
							title: null,
							showDate: null
						},
						yAxis : {
							inputID: null,
							title: null,
						},
						calculations: [
							{
								label: null,
								formula: null,
								unit: null
							}
						]
					}
				break;
			}

			return newReportObj;
		}

		//Actives given task/tab
		$scope.ActivateTab = function($index) {
			$scope.activeReport = $scope.reports[$index];
			$scope.activeContentView = 'app/views/partial-views/reports/report-type-'+$scope.activeReport.type+'-view.html';
		};

		//Return true if given report/tab is active
		$scope.IsActiveReport = function(report) {

			if ($scope.activeReport === undefined) {
				$scope.reports = iLog.iLogDataSource.reports;
				$scope.ActivateTab(0);
			}

			return $scope.activeReport.id === report.id;
		};

		//Modal confirmation for deletion
		$scope.DeleteInput = function($index) {

			var modalText = {
				modalTitle: 'Slet input',
				modalText: 'Er du sikker på at du vil slette dette input felt?',
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
				$scope.activeReport.columns.splice(selectedItemIndex,1);
			});

		};

		//Move input up
		$scope.MoveSourceUp = function($index) {

			if ($index > 0) {
				var thisInput = $scope.activeReport.columns[$index];

				$scope.activeReport.columns.splice($index, 1);
				$scope.activeReport.columns.splice($index-1, 0, thisInput);
			}

		};

		//Move input down
		$scope.MoveSourceDown = function($index) {

			if ($index !== $scope.activeReport.columns.length-1) {
				var thisInput = $scope.activeReport.columns[$index];

				$scope.activeReport.columns.splice($index, 1);
				$scope.activeReport.columns.splice($index+1, 0, thisInput);
			}

		};

		//Insert input object at index
		$scope.AddReportInputAtIndex = function($index) {

			var newInputObj = {
				id: CreateNewId('K', true),
				inputID: null,
				label: null
			}

			//Add to end of array
			if ($index === undefined) {
				$scope.activeReport.columns.push(newInputObj);
				return;
			}

			$scope.activeReport.columns.splice($index, 0, newInputObj);

		}

		//Creates new id with param prepended in new id, if 2nd paramtre is true determin ny id digit
		function CreateNewId(preId, appendToExistingIds) {

			var highestId = 0;

			if (appendToExistingIds) {
				for (var i = 0; i < $scope.activeReport.columns.length; i++) {

					var currentIdDigit = $scope.activeReport.columns[i].id.split('K')[1];

					highestId = currentIdDigit > highestId ?  currentIdDigit : highestId;

					highestId = parseInt(highestId);

				};
			}

			return preId+(highestId+1);
		}

		//Concatenate tab title if more than 15 chars
		$scope.ConcatTabTitleTo = function(report, maxLength) {

			var caret = ' <span class="caret"></span>';
			var tabType = $scope.ConvertTypeToText(report.type);
			var isTitleEmpty = report.title ? false : true;
			var tabTitle = isTitleEmpty ? tabType : tabTitle = tabType + ' : ' + report.title;

			tabTitle = tabTitle.length < maxLength ? tabTitle : TruncateTitle(tabTitle, maxLength);

			var createHtmlTitle = isTitleEmpty? tabTitle + caret : tabTitle.split(' : ')[0] + ' : <strong>' + tabTitle.split(' : ')[1] + '</strong>' + caret;

			return createHtmlTitle;

		}

		//Truncates title to max based in params
		function TruncateTitle(string, maxLength) {

			var newString = string.substring(0, maxLength-3);

			newString += '...';

			return newString;
		}

		//Get available ids from user inputs and return array
		$scope.ConstructInputArrayOfIdAndTitle = function() {

			$scope.identifierArray = [];

			var inputs = iLog.GetData().inputs;

			for (var i = 0; i < inputs.length; i++) {

				var identifer = inputs[i].label ? inputs[i].id + ' - ' + inputs[i].label : inputs[i].id;

				$scope.identifierArray.push(identifer);

			};

		}

		//Sets new inputID in field
		$scope.SelectNewInputID = function(field, newId) {
			field.inputID = newId.split(' - ')[0];
		}

		Init();


	}]);

}());
