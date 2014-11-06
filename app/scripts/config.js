'use strict';

//  Define app and inject modules
var app = angular.module('app', [
	'ngResource',
	'ngRoute',
	'd3',
	'gyldendal.services',
	'gyldendal.directives',
  'gyldendal.filters',
	'angularSpinner',
		'ngAnimate'
])

//	Configure module
.config(['$routeProvider','$locationProvider',function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
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
          entries: function (getdataservice, $route) {
            return getdataservice.getList($route.current.params);
          },
          component: function (getdataservice, $route) {
            return getdataservice.loadComponent($route.current.params);
          }
        }
			})
			.when('/logs', {
				templateUrl: 'views/LogsOverview.html',
				controller: 'LogsOverviewCtrl',
				controllerAs: 'LogsOverview',
				resolve: {
          entries: function (getdataservice, $route) {
            return getdataservice.getList($route.current.params);
          },
          component: function(getdataservice, $route) {
            return getdataservice.loadComponent($route.current.params);
          }
				}
			})
			.when('/rapporter', {
				templateUrl: 'views/rapportOverview.html',
				controller: 'RapportOverviewCtrl',
				controllerAs: 'RapportOverview',
				resolve: {
          entries: function (getdataservice, $route) {
            return getdataservice.getList($route.current.params);
          }
				}
			})
			.when('/rapport/:id', {
				templateUrl: 'views/rapport.html',
				controller: 'RapportCtrl',
				controllerAs: 'Rapport',
				resolve: {
          component: function(getdataservice, $route) {
            return getdataservice.loadComponent($route.current.params);
          },
          entries: function (getdataservice, $route) {
            return getdataservice.getList($route.current.params);
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
          entries: function (getdataservice, $route) {
            return getdataservice.getList($route.current.params);
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
          entries: function (getdataservice, $route) {
            return getdataservice.getList($route.current.params);
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