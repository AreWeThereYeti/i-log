'use strict';

//Add class on scroll
angular.module('gyldendal.directives')
    .directive("scroll", function ($window) {
      return function(scope, element, attrs) {
        scope.boolChangeClass = true;
        angular.element($window).bind("scroll", function() {
          if(this.pageYOffset >= 50) {
            scope.boolChangeClass = false;
          } else {
            scope.boolChangeClass = true;
          }
          scope.$apply();
        });
      };
    });