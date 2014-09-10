'use strict';

//Add class on scroll
angular.module('linkfireWebappApp')
	.directive('backImg', function(){
		return function(scope, element, attrs){
			var url = attrs.backImg;
			element.css({
				'background-image': '-webkit-linear-gradient(left, rgba(0,0,0,0.7) 0% ,rgba(0,0,0, 0) 100%), url(' + url +')',
				'background-size' : 'cover'
			});
		};
	});