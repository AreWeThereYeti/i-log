angular.module('gyldendal.directives')
	.directive('dialog',[function() {
		return {
			restrict: 'EA',
			scope : true,
			replace : true,
			controller : 'DialogCtrl',
			controllerAs : 'Dialog',
			templateUrl: 'scripts/templates/dialog.html'
		};
	}]);