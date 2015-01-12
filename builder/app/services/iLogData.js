(function() {

	angular.module('gyldendalAppIlog').service('iLog', ['$http', function($http) {

		this.Init = function() {
			this.LoadComponent();
		};

		this.DataFetched = false;
		this.openViewer = false;

		this.iLogDataSource = {

			title: '',
			type: null,
			userID: null,

			inputs: [],

			reports: [],

			settings: {
				mail: false,
				download: false,
				exportEnabled : false,
				fontFamily: null,
				fontSize: null,
				backgroundImageID: null,
				listview: null,
			}

		};

		this.GetData = function() {
			return this.iLogDataSource;
		};

		this.GetComponentId = function() {

			var paramsArray = location.href.split('?')[1].split('&');
			var componentID;

			for (var i = 0; i < paramsArray.length; i++) {
				if (paramsArray[i].indexOf('componentID=') > -1) {
					componentID = paramsArray[i].replace('componentID=','');
					break;
				}
			}

			return 	componentID;
		};

		this.LoadComponent = function() {

            var self = this;

			var componentID = this.GetComponentId();

			$http.get('php/load-component.php?componentID='+componentID).success(function(data, status) {

                if (status === 200) {
                    self.iLogDataSource = angular.fromJson(data.Content) || {};

					if (!self.iLogDataSource.title) {
						self.iLogDataSource.title = data.Title;
					}

                    self.iLogDataSource.type = data.Type;
                    self.iLogDataSource.userID = data.Owner.UserID;

					if (!self.iLogDataSource.settings.labelPlacement) {
						self.iLogDataSource.settings.labelPlacement = 'left';
					}

					self.DataFetched = true;
					return;
                }

				alert('Der skete en ved indlæsning af komponent-data. Prøv venligst igen');

            });

		};

		this.SaveComponent = function(componentJson) {

			var requestData = {
				ID: this.GetComponentId(),
				Title: this.iLogDataSource.title,
				Content: componentJson
			};

			requestData = angular.toJson(requestData);

			return $http.post('php/save-component.php', {data: requestData});

		};

		this.Init();

	}]);

}());
