'use strict';

var app = angular.module('app', [
	'ngResource',
	'ngRoute',
	'gyldendal.services'
])

.config(['$routeProvider', '$locationProvider',function ($routeProvider, $locationProvider) {

	$routeProvider
			.when('/', {
				templateUrl: 'views/mainOverview.html',
				controller: 'MainOverviewCtrl',
				controllerAs: 'MainOverview'
			})
			.when('/logs', {
				templateUrl: 'views/LogsOverview.html',
				controller: 'LogsOverviewCtrl',
				controllerAs: 'LogsOverview'
			})
			.when('/rapporter', {
				templateUrl: 'views/rapportsoverview.html',
				controller: 'RapportsOverviewCtrl',
				controllerAs: 'RapportsOverview'
//			resolve: {
//				links: function (dataService, $route) {
//					return dataService.getBoards($route.current.params);
//				}
//			}
			})
			.when('/rapport/:id', {
				templateUrl: 'views/rapport.html',
				controller: 'RapportCtrl',
				controllerAs: 'Rapport'
//			resolve: {
//				links: function (dataService, $route) {
//					return dataService.getBoards($route.current.params);
//				}
//			}
			})
			.when('/log/:id', {
				templateUrl: 'views/log.html',
				controller: 'LogCtrl',
				controllerAs: 'Log',
				resolve: {
					logs: function(GetLogService, $route) {
						return GetLogService.getLog($route.current.params);
					}
				}
			})
			.otherwise({
				redirectTo: '/'
			});
}])

.run(['$rootScope', function( $rootScope ) {
//			Look for route changes
	$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
//				Check if promise is resolves on route change. Show loader while processing
		if (curr.$$route && curr.$$route.resolve) {
			// Show a loading message until promises are not resolved
			console.log('showing loading message. Setting $rootScope.loadingView to true');
			$rootScope.loadingView = true;
		}
	});
//	Listen to when route has successfully changed
	$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
		// Hide loading message
		console.log('hiding loading message');
		$rootScope.loadingView = false;
	});
}]);