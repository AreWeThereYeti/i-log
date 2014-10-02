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

        loadComponent: function() {

            var ComponentID = '540025f23c5b5a07d0570c53';
            var returndata;

            var promise = $http({
              cache: false,
              headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
              },
              method: 'GET',
              url: '/php/michael/load-component.php?componentID=' + '540025f23c5b5a07d0570c53' /*+ $location.search().componentID <-- --- --- ComponentID er lige nu hardcoded. Skal hentes fra URL*/
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
            },

        deleteEntry: function() {

            var returndata

            var promise = $http({
              cache: false,
              headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
              },
              method: 'GET',
              url: '/php/mads/deleteEntry.php?componentID=' + '540025f23c5b5a07d0570c53' /*+ $location.search().componentID <-- --- --- ComponentID er lige nu hardcoded. Skal hentes fra URL*/
              })
              .success(function (data, status, headers, config) {
              if (data.Content !== null) {
                returndata = angular.fromJson(data.Content);
              }
            });

            return promise;
          },
        getLatest: function() {

          //Needs userID and Component id
          var UserID = 'mort088k';
          var ComponentID = '540025f23c5b5a07d0570c53';

          var returndata;

          var promise = $http({
            cache: false,
            headers: {
              'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
            },
            method: 'GET',
            url: '/php/mads/getLatestEntry.php?userID=' + UserID + '&componentID=' + ComponentID /*+ $location.search().componentID <-- --- --- ComponentID er lige nu hardcoded. Skal hentes fra URL*/
            })
            .success(function (data, status, headers, config) {
            if (data.Content !== null) {
              returndata = angular.fromJson(data.Content);
            }
          });

          return promise;
        },
        addNewLog: function(log) {

          //Needs userID and Component id
          var UserID = 'mort088k';
          var ComponentID = '540025f23c5b5a07d0570c53';

          var returndata;

          var request = {
            "componentEntry": {
              "userID":         UserID,
              "componentID":    ComponentID,
              "componentType":  "i-log",
              "productID":      1111111111111,
              "title":          "some title",
              "content":        log
            }
          };
          console.log("request: "+request);

          var promise = $http({
            cache: false,
            headers: {
              'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
            },
            method: 'POST',
            url: '/php/mads/addEntry.php/',
            data: angular.toJson(request)
          })
            .success(function (data, status, headers, config) {
              if (data !== null) {
                console.log("response: "+JSON.stringify(data));
                //returndata = angular.fromJson(data);
              }
            })
            .error(function(error){
              console.log("err: "+JSON.stringify(error));

            });

          return promise;
        },
        updateLog: function(newLogs, objectId) {

          var request = {
            "objectID":         objectId,
            "componentEntry": {
              "title":          "some title",
              "content":        angular.toJson(newLogs)
            }
          };

          console.log("request: "+request);

          var promise = $http({
            cache: false,
            headers: {
              'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
            },
            method: 'POST',
            url: '/php/mads/updateEntry.php/',
            data: angular.toJson(request)
          })
            .success(function (data, status, headers, config) {
                console.log("response: "+JSON.stringify(data));
            })
            .error(function(error){
              console.log("err: "+JSON.stringify(error));

            });

           return promise;
        },
        deleteAllLogs: function(objectId) {

          // objectID of the entry to delete
          var request = {
            "objectID": objectId
          };

          var promise = $http({
            cache: false,
            headers: {
              'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
            },
            method: 'POST',
            url: '/php/mads/deleteEntry.php/',
            data: angular.toJson(request)
          })
            .success(function (data, status, headers, config) {
              console.log("delete: "+data);
            });

          return promise;
        }

			};

			return sdo
		}]);