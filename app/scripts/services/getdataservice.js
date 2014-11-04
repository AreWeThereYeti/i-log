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

                    //set productID
                    $rootScope.productID = data.Owner.ProductID;
                    console.log($rootScope.productID);
                    //set settings in rootscope
                    $rootScope.download = returndata.settings.download;
                    $rootScope.canExport = returndata.settings.exportEnabled;

                    // hardcoded the test api url for testing. remove 'test' for release
                    $rootScope.backgroundImageID = 'http://bridge.test.components.gyldendal.dk/api/Media/Get/'+returndata.settings.backgroundImageID;

                    // fontFamily is set to franklin and list font to the font defined in settings
                    $rootScope.listFamily = returndata.settings.fontFamily;
                    $rootScope.fontFamily = "Franklin, sans-serif"; // returndata.settings.fontFamily;

                    $rootScope.fontSize = returndata.settings.fontSize;
                    $rootScope.listView = returndata.settings.listView;
                    $rootScope.mail = returndata.settings.mail;
                  }else{
                  }
              });

              return promise;
            },

        getList: function() {

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
            url: 'php/mads/getList.php?userID=' + UserID + '&componentID=' + ComponentID /*+ $location.search().componentID <-- --- --- ComponentID er lige nu hardcoded. Skal hentes fra URL*/
          })
            .success(function (data, status, headers, config) {
              if (data.Content !== null) {
                returndata = angular.fromJson(data.Content);
              }
            });

          return promise;
        },
        addNewReport: function(report) {

          //Needs userID and Component id
          var UserID = 'mort088k';
          var ComponentID = '540025f23c5b5a07d0570c53';

          var returndata;

          var request = {
            "componentEntry": {
              "userID":         UserID,
              "componentID":    ComponentID,
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
                //returndata = angular.fromJson(data);
              }
            })
            .error(function(error){

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
        }

			};

			return sdo
		}]);