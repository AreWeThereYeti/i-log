'use strict';

//  Define app and inject modules
var app = angular.module('app', [
	'ngResource',
	'ngRoute',
	'gyldendal.services'
])

//	Configure module
.config(['$routeProvider',function ($routeProvider) {

	$routeProvider
			.when('/', {
				templateUrl: 'views/LogsOverview.html',
				controller: 'LogsOverviewCtrl',
				controllerAs: 'LogsOverview',
				resolve: {
					reports: function(getdataservice, $route) {
						return getdataservice.getAllLogs($route.current.params);
					}
				}
			})
			.when('/logs', {
				templateUrl: 'views/LogsOverview.html',
				controller: 'LogsOverviewCtrl',
				controllerAs: 'LogsOverview',
				resolve: {
					reports: function(getdataservice, $route) {
						return getdataservice.getAllLogs($route.current.params);
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
					reports: function(getdataservice, $route) {
						return getdataservice.getReport($route.current.params);
					}
				}
			})
			.when('/log/:id', {
				templateUrl: 'views/log.html',
				controller: 'LogCtrl',
				controllerAs: 'Log',
				resolve: {
					logs: function(getdataservice, $route) {
						return getdataservice.getLog($route.current.params);
					}
				}
			})
			.otherwise({
				redirectTo: '/'
			});
}])

.run(['$rootScope', function( $rootScope ) {
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
	});
}]);