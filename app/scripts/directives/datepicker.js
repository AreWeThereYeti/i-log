angular.module('gyldendal.directives')
	.directive('datePicker',[function() {
		return {
			restrict: 'EA',
			scope : {
			},
			templateUrl: 'scripts/templates/datepicker.html',
			controller : 'DatePickerCtrl',
			controllerAs: 'DatePicker',
			replace: true, // Replace with the template below
			link: function(scope, element, attrs) {
				console.log('datepicker');
				element.bind('click', function(){
					console.log('clicked');
					scope.data = 'clicked';
					scope.$apply();
				})
			}
		};
	}]);