angular.module('gyldendal.services', [])
		.factory('getdataservice', ['$http', function($http) {
			var sdo= {
				getAllLogs: function () {
					var promise = $http({cache: true, method: 'GET', url: 'http://www.mocky.io/v2/5412cb2886a645eb0aa1c336' }).success(function (data, status, headers, config) {

					});
					return promise;
				},

				getLog: function () {
					var promise = $http({cache: true, method: 'GET', url: 'http://www.mocky.io/v2/5412cb2886a645eb0aa1c336' }).success(function (data, status, headers, config) {

					});
					return promise;
				},

				getAllReports: function () {
					var promise = $http({cache: true, method: 'GET', url: 'http://www.mocky.io/v2/541416bce37eca2c0a8e2dad' }).success(function (data, status, headers, config) {

					});
					return promise;
				},

				getReport: function () {
					var promise = $http({cache: true, method: 'GET', url: 'http://www.mocky.io/v2/541416bce37eca2c0a8e2dad' }).success(function (data, status, headers, config) {

					});
					return promise;
				}
			};

			return sdo
		}]);