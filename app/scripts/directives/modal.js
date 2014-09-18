angular.module('gyldendal.directives', [])
	.directive('modalDialog',['$window',function($window) {
		return {
			restrict: 'E',
			scope: {
				show: '='
			},
			templateUrl: '../templates/dialog.html',
			replace: true, // Replace with the template below
			transclude: true, // we want to insert custom content inside the directive
			link: function(scope, element, attrs) {
				scope.dialogStyle = {};
				if (attrs.width){
					scope.dialogStyle.width = attrs.width;
				}
				if (attrs.height){
					scope.dialogStyle.height = attrs.height;
				}
				scope.hideModal = function() {
					scope.show = false;
				};

				element.bind("click", function(){
					console.log("Need to change the model value but dont know how to yet");
				})
			}
		};
	}]);