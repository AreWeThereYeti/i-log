'use strict';

var app = angular.module('app', [
	'ngResource',
	'ngRoute'
])

.config(['$routeProvider',function ($routeProvider) {

	$routeProvider
			.when('/', {
				templateUrl: 'views/oversigt.html',
				controller: 'OversigtCtrl',
				controllerAs: 'Oversigt'
			})
			.when('/viser', {
				templateUrl: 'views/viser.html',
				controller: 'ViserCtrl',
				controllerAs: 'Viser'
			})
			.when('/rapport', {
				templateUrl: 'views/rapport.html',
				controller: 'RapportCtrl',
				controllerAs: 'Rapport'
//			resolve: {
//				links: function (dataService, $route) {
//					return dataService.getBoards($route.current.params);
//				}
//			}
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
			$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
				// Hide loading message
				console.log('hiding loading message');
				$rootScope.loadingView = false;
			});
		}]);
