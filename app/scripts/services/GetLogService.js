angular.module('gyldendal.services', [])
		.factory('GetLogService', ['$http', function($http) {
			var logs= {
				getLog: function () {
					var promise = $http({ method: 'GET', url: 'http://www.mocky.io/v2/5412cb2886a645eb0aa1c336' }).success(function (data, status, headers, config) {
					});
					return promise;
				}
			};
			return logs
		}]);