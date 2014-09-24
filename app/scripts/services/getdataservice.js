angular.module('gyldendal.services', [])
		.factory('getdataservice', ['$http', '$location', function($http, $location) {
			var sdo= {
				getAllLogs: function () {
					var promise = $http({cache: false, method: 'GET', url: 'http://www.mocky.io/v2/5412cb2886a645eb0aa1c336' }).success(function (data, status, headers, config) {
					});
					return promise;
				},

				getLog: function () {
					var promise = $http({cache: true, method: 'GET', url: 'http://www.mocky.io/v2/54212323da4aeb85000aabb5' }).success(function (data, status, headers, config) {


					});
					return promise;
				},

				getAllReports: function () {
					var promise = $http({cache: false, method: 'GET', url: 'http://www.mocky.io/v2/54217262da4aeb4a070aabcf' }).success(function (data, status, headers, config) {

					});
					return promise;
				},

				getReport: function () {
					var promise = $http({cache: false, method: 'GET', url: 'http://www.mocky.io/v2/541416bce37eca2c0a8e2dad' }).success(function (data, status, headers, config) {

					});
					return promise;
                },

                testfunction: function () {
					var promise = $http({cache: false, method: 'GET', url: 'http://www.mocky.io/v2/541416bce37eca2c0a8e2dad' }).success(function (data, status, headers, config) {

					});
					return promise;
                },

                loadComponent: function() {

                    var promise = $http({
                        cache: false,
                        method: 'GET',
                        url: '/php/load-component.php?componentID=' + '540025f23c5b5a07d0570c53' /*+ $location.search().componentID <-- --- --- ComponentID er lige nu hardcoded. Skal hentes fra URL*/
                    })
                        .success(function (data, status, headers, config) {
                        if (data.Content !== null) {
                            self.iLogDataSource = angular.fromJson(data.Content);
                            console.log(self.iLogDataSource);
                        }
                        return test = angular.fromJson(data.Content);
                    });

                    return promise;
                }
			};

			return sdo
		}]);