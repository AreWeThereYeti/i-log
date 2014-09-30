'use strict';

//Add class on scroll
angular.module('gyldendal.directives')
    .directive("scroll", function ($window, $rootScope) {
      return function(scope, element, attrs) {
        $rootScope.filter = true;
        angular.element($window).bind("scroll", function() {
          if(this.pageYOffset >= 50) {
            $rootScope.filter = false;
          } else {
            $rootScope.filter = true;
          }
          scope.$apply();
        });
      };
    });