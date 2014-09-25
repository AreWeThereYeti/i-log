angular.module('gyldendal.services', [])
		.factory('getdataservice', ['$http', '$location', '$rootScope', function($http, $location, $rootScope) {
			var sdo= {
				getAllLogs: function () {
					var promise = $http({cache: false, method: 'GET', url: 'http://www.mocky.io/v2/5412cb2886a645eb0aa1c336' }).success(function (data, status, headers, config) {
					});
					return promise;
				},

				getLog: function () {
					var promise = $http({cache: true, method: 'GET', url: 'http://www.mocky.io/v2/5423e3b2863063f90178efa3' }).success(function (data, status, headers, config) {


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

            var returndata

            var promise = $http({
              cache: false,
              headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
              },
              method: 'GET',
              url: '/php/load-component.php?componentID=' + '540025f23c5b5a07d0570c53' /*+ $location.search().componentID <-- --- --- ComponentID er lige nu hardcoded. Skal hentes fra URL*/
              })
                  .success(function (data, status, headers, config) {
                  if (data.Content !== null) {
                    returndata = angular.fromJson(data.Content);

                    //set settings in rootscope
                    $rootScope.backgroundImageID = returndata.settings.backgroundImageID;
                    $rootScope.download = returndata.settings.download;
                    $rootScope.export = returndata.settings.export;
                    $rootScope.fontFamily = returndata.settings.fontFamily;
                    $rootScope.fontSize = returndata.settings.fontSize;
                    $rootScope.listView = returndata.settings.listView;
                    $rootScope.mail = returndata.settings.mail;
                  }
              });

              return promise;
            }
			};

			return sdo
		}]);