'use strict';

angular.module('gyldendal.directives')
    .directive('dynamicCss', function($compile) {
      return {
        restrict: 'A',
        link: function postLink(scope, element) {
          if (element.html()) {
            var template = $compile('<style ng-bind-template="' + element.html() + '"></style>');
            element.replaceWith(template(scope));
          }
        }
      };
    });