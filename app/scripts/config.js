'use strict';

//  Define app and inject modules
var app = angular.module('app', [
	'ngResource',
	'ngRoute',
	'd3',
	'gyldendal.services',
	'gyldendal.directives',
  'gyldendal.filters'
])

//	Configure module
.config(['$routeProvider',function ($routeProvider) {

  // Extend isDefined to also check for null
  angular.isDefinedOrNotNull = function(val) {
    return angular.isDefined(val) || val === null
  };

	$routeProvider
			.when('/', {
				templateUrl: 'views/LogsOverview.html',
				controller: 'LogsOverviewCtrl',
				controllerAs: 'LogsOverview',
				resolve: {
          logs: function(getdataservice, $route) {
            return getdataservice.getLatest($route.current.params);
          }
				}
			})
			.when('/logs', {
				templateUrl: 'views/LogsOverview.html',
				controller: 'LogsOverviewCtrl',
				controllerAs: 'LogsOverview',
				resolve: {
          logs: function(getdataservice, $route) {
            return getdataservice.getLatest($route.current.params);
          }
				}
			})
			.when('/rapporter', {
				templateUrl: 'views/rapportoverview.html',
				controller: 'RapportOverviewCtrl',
				controllerAs: 'RapportOverview',
				resolve: {
					reports: function(getdataservice, $route) {
						return getdataservice.getAllReports($route.current.params);
					}
				}
			})
			.when('/rapport/:id', {
				templateUrl: 'views/rapport.html',
				controller: 'RapportCtrl',
				controllerAs: 'Rapport',
				resolve: {
					report: function(getdataservice, $route) {
						return getdataservice.getReport($route.current.params);
					},
          component: function(getdataservice, $route) {
            return getdataservice.loadComponent($route.current.params);
          },
          logs: function(getdataservice, $route) {
            return getdataservice.getLatest($route.current.params);
          }
				}
			})
      .when('/log', {
        templateUrl: 'views/log.html',
        controller: 'LogCtrl',
        controllerAs: 'Log',
        resolve: {
          component: function(getdataservice, $route) {
            return getdataservice.loadComponent($route.current.params);
          },
          logs: function(getdataservice, $route) {
            return getdataservice.getLatest($route.current.params);
          }
        }
      })
			.when('/log/:id', {
				templateUrl: 'views/log.html',
				controller: 'LogCtrl',
				controllerAs: 'Log',
				resolve: {
					component: function(getdataservice, $route) {
						return getdataservice.loadComponent($route.current.params);
					},
          logs: function(getdataservice, $route) {
            return getdataservice.getLatest($route.current.params);
          }
				}
			})
			.otherwise({
				redirectTo: '/'
			});
}])

.run(['$rootScope','$location', function( $rootScope, $location) {
	//	Look for route changes
	$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
		//	Check if promise is resolves on route change. Show loader while processing
		if (curr.$$route && curr.$$route.resolve) {
			// Show a loading message until promises are not resolved
			$rootScope.loadingView = true;
		}
	});

	//	Listen to when route has successfully changed
	$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
		// Hide loading message
		$rootScope.loadingView = false;
		// Set path in rootvariable
		$rootScope.showSection = $location.path();
	});
}]);