'use strict';

//Add class on scroll
angular.module('gyldendal.directives')
    .directive("scroll", function ($window, $rootScope) {
      return function(scope, element, attrs) {
        $rootScope.filter = true;

        angular.element(element).bind("scroll", function() {
          if(this.scrollTop > 50) {
            $rootScope.filter = false;
          }
          scope.$apply();
        });
      };
    });