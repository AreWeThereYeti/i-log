angular.module('gyldendal.directives')
	.directive('datePicker',[function() {
		return {
			restrict: 'EA',
			scope : true,
			templateUrl: 'scripts/templates/datepicker.html',
			controller : 'DatePickerCtrl',
			replace: true, // Replace with the template below
			link: function(scope, element, attrs) {
				element.bind('click', function(element){
					scope.$apply();
				})
			}
		};
	}]);