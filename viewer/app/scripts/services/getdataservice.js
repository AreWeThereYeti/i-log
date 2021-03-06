angular.module('gyldendal.services', [])
		.factory('getdataservice', ['$http', '$location', '$rootScope', function($http, $location, $rootScope) {
			var sdo= {

        loadComponent: function() {

          //finds userID and Component id in url
          var locationComponentId = (window.location.href.split('#')[0].split('componentID=')[1] || '').split('&')[0],
              locationUserId = (window.location.href.split('#')[0].split('userID=')[1] || '').split('&')[0];
          if(angular.isDefinedOrNotNull(locationComponentId) && angular.isDefinedOrNotNull(locationUserId)){
            localStorage.userID =  locationUserId;
            localStorage.componentID =  locationComponentId;
          }
          var componentID = localStorage.componentID;


          var promise = $http({
              cache: false,
              headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
              },
              method: 'GET',
              url: 'php/michael/load-component.php?componentID=' + componentID//$rootScope.componentID//locationComponentId // <-- --- --- ComponentID er lige nu hardcoded. Skal hentes fra URL*/
              })
                  .success(function (data, status, headers, config) {
                  if (data.Content !== null && angular.isDefined(data.Content)) {

                    returndata = angular.fromJson(data.Content);

                    //set productID
                    $rootScope.productID = data.Owner.ProductID;
                    //set settings in rootscope
                    $rootScope.download = returndata.settings.download;
                    $rootScope.canExport = returndata.settings.exportEnabled;

                    // Determine if we're on production or dev environment
                    var isProduction = (window.location.href.toLowerCase().indexOf('stage2.sl-udv.dk') !== -1 || window.location.href.toLowerCase().indexOf('local.io') !== -1 || window.location.href.indexOf('felskov.io') !== -1 || window.location.href.indexOf('test.') !== -1 || window.location.href.indexOf('dev.') !== -1) ? false : true;

                    // hardcoded the test api url for testing. remove 'test' for release
                    $rootScope.backgroundImageID = (isProduction ? 'http://bridge.components.gyldendal.dk/api/Media/Get/' : 'http://bridge.test.components.gyldendal.dk/api/Media/Get/') + returndata.settings.backgroundImageID;

                    // fontFamily is set to franklin and list font to the font defined in settings
                    $rootScope.listFamily = returndata.settings.fontFamily;
                    $rootScope.fontFamily = "'franklin-gothic-urw', helvetica, arial, sans-serif"; // returndata.settings.fontFamily;

                    $rootScope.fontSize = returndata.settings.fontSize;
                    $rootScope.listView = returndata.settings.listView;
                    $rootScope.mail = returndata.settings.mail;
                  }else{
                  }
              });

              return promise;
            },

        getList: function() {

          //finds userID and Component id in url
          var locationComponentId = (window.location.href.split('#')[0].split('componentID=')[1] || '').split('&')[0],
              locationUserId = (window.location.href.split('#')[0].split('userID=')[1] || '').split('&')[0];
          if(angular.isDefinedOrNotNull(locationComponentId) && angular.isDefinedOrNotNull(locationUserId)){
            localStorage.userID =  locationUserId;
            localStorage.componentID =  locationComponentId;
          }
          var userID = localStorage.userID;
          var componentID = localStorage.componentID;

          var promise = $http({
            cache: false,
            headers: {
              'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8'
            },
            method: 'GET',
            url: 'php/mads/getList.php?userID=' + userID + '&componentID=' + componentID /*+ locationComponentId <-- --- --- ComponentID er lige nu hardcoded. Skal hentes fra URL*/
          })
            .success(function (data, status, headers, config) {
              if (data.Content !== null) {
                returndata = angular.fromJson(data.Content);
              }
            });

          return promise;
        },
        addNewReport: function(report) {

          var userID = localStorage.userID;
          var componentID = localStorage.componentID;


          var request = {
            "componentEntry": {
              "userID":         userID,
              "componentID":    componentID,
              "componentType":  "i-log",
              "componentSubType": "rapport",
              "productID":      $rootScope.productID,
              "title":          report.title,
              "content":        angular.toJson(report.data),
              "readOnly": false
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
              }
            })
            .error(function(error){

            });

          return promise;
        },
        addNewLog: function(log) {

          var userID = localStorage.userID;
          var componentID = localStorage.componentID;

          var request = {
            "componentEntry": {
              "userID":         userID,
              "componentID":    componentID,
              "componentType":  "i-log",
              "componentSubType": null,
              "productID":      $rootScope.productID,
              "title":          "some title",
              "content":        log,
              "readOnly": false

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
        deleteEntry: function(objectId) {

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
        },
        shareReport: function (objectId, message) {
          // Prepare request-data
          var request = {
            'objectID': objectId
          };

          // If a message was entered, add to the request-data
          if (message) {
            var userId = (window.location.href.split('#')[0].split('userID=')[1] || '').split('&')[0];

            request.message = {
              author: {ID: userId},
              content: message
            }
          }

          // Perform the request!
          var promise = $http({
            cache: false,
            headers: {
              'Content-Type'  : 'application/json; charset=utf-8'
            },
            method: 'POST',
            url: 'php/mads/shareEntry.php',
            data: angular.toJson(request)
          })
            .success(function (data, status, headers, config) {
            });

          return promise;
        }

			};

			return sdo
		}]);