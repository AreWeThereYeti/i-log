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
}])
