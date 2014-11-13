angular.module('d3', [])
		.factory('d3Service', ['$document', '$window', '$q', '$rootScope',
			function($document, $window, $q, $rootScope) {
				var d = $q.defer(),
						d3service = {
							d3: function() { return d.promise; }
						};
				function onScriptLoad() {
					// Load client in the browser
					$rootScope.$apply(function() { d.resolve($window.d3); });
				}

				var scriptTag = $document[0].createElement('script');
				scriptTag.type = 'text/javascript';
				scriptTag.async = true;
				scriptTag.src = 'scripts/libs/d3.min.js';

				if(navigator.appVersion.indexOf("MSIE 8.0") != -1 ){
					scriptTag.src = 'scripts/libs/r2d3.min.js';
				}

				scriptTag.onreadystatechange = function () {
					if (this.readyState == 'complete') onScriptLoad();
				};

				scriptTag.onload = onScriptLoad;

				var s = $document[0].getElementsByTagName('body')[0];
				s.appendChild(scriptTag);

				return d3service;
			}]);