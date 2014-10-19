angular.module('gyldendal.services', [])
		.factory('getdataservice', ['$http', '$location', '$rootScope', function($http, $location, $rootScope) {
			var sdo= {

        loadComponent: function() {

            var ComponentID = '540025f23c5b5a07d0570c53';
            var returndata;

            var promise = $http({
              cache: false,
              headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
              },
              method: 'GET',
              url: 'php/michael/load-component.php?componentID=' + '540025f23c5b5a07d0570c53' /*+ $location.search().componentID <-- --- --- ComponentID er lige nu hardcoded. Skal hentes fra URL*/
              })
                  .success(function (data, status, headers, config) {
                  if (data.Content !== null && angular.isDefined(data.Content)) {

                    returndata = angular.fromJson(data.Content);

                    //set settings in rootscope
                    $rootScope.backgroundImageID = returndata.settings.backgroundImageID;
                    $rootScope.download = returndata.settings.download;
                    $rootScope.canExport = returndata.settings.export;
                    $rootScope.fontFamily = returndata.settings.fontFamily;
                    $rootScope.fontSize = returndata.settings.fontSize;
                    $rootScope.listView = returndata.settings.listView;
                    $rootScope.mail = returndata.settings.mail;
                  }else{
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
              url: 'php/mads/deleteEntry.php?componentID=' + '540025f23c5b5a07d0570c53' /*+ $location.search().componentID <-- --- --- ComponentID er lige nu hardcoded. Skal hentes fra URL*/
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
            url: 'php/mads/getLatestEntry.php?userID=' + UserID + '&componentID=' + ComponentID /*+ $location.search().componentID <-- --- --- ComponentID er lige nu hardcoded. Skal hentes fra URL*/
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

          var promise = $http({
            cache: false,
            headers: {
              'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
            },
            method: 'POST',
            url: 'php/mads/addEntry.php',
            data: angular.toJson(request)
          })
            .success(function (data, status, headers, config) {
              if (data !== null) {
                //returndata = angular.fromJson(data);
              }
            })
            .error(function(error){

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


          var promise = $http({
            cache: false,
            headers: {
              'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
            },
            method: 'POST',
            url: 'php/mads/updateEntry.php',
            data: angular.toJson(request)
          })
            .success(function (data, status, headers, config) {
            })
            .error(function(error){
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
            url: 'php/mads/deleteEntry.php',
            data: angular.toJson(request)
          })
            .success(function (data, status, headers, config) {
            });

          return promise;
        }

			};

			return sdo
		}]);