angular.module('gyldendal.directives', ['d3'])
		.directive('d3Pie', ['d3Service', '$window', function(d3Service, $window) {
			return {
				restrict: 'EA',
				scope: {
					piedata: '=' // bi-directional data-binding
				},
				link: function(scope, ele, attrs) {
					d3Service.d3().then(function(d3) {
						var margin = parseInt(attrs.margin) || 20,
								barHeight = parseInt(attrs.barHeight) || 20,
								barPadding = parseInt(attrs.barPadding) || 5;

						var svg = d3.select(ele[0])
								.append('svg')
								.style('width', '100%');

						// Browser onresize event
						window.onresize = function() {
							scope.$apply();
						};

						// Watch for resize event
						scope.$watch(function() {
							return angular.element($window)[0].innerWidth;
						}, function() {
							scope.render(scope.piedata);
						});

//						Render d3 chart or graph
						scope.render = function(data) {

							// remove all previous items before render
							svg.selectAll('*').remove();

							// If we don't pass any data, return out of the element
							if (!data) return;

							var text;

							var colors = ['green','blue'];

							var colorscale = d3.scale.linear().domain([0,data.length]).range(colors);

							var arc = d3.svg.arc()
									.innerRadius(0)
									.outerRadius(150);

							var arcOver = d3.svg.arc()
									.innerRadius(0)
									.outerRadius(150 + 10);

							var pie = d3.layout.pie()
									.value(function(d){ return d.value; });


							var renderarcs = svg.append('g')
									.attr('transform','translate(440,200)')
									.selectAll('.arc')
									.data(pie(data))
									.enter()
									.append('g')
									.attr('class',"arc");

							renderarcs.append('path')
								.attr('d',arc)
								.attr('fill',function(d,i){ return colorscale(i); })
								.on("mouseover", function(d) {
									d3.select(this).transition()
										.duration(1000)
										.attr("d", arcOver)
										.ease("elastic");

									text = renderarcs.append("text")
										.attr("transform",'translate(' + arc.centroid(d)[0] + ', ' + arc.centroid(d)[1] + ')' )
										.attr("dy", ".5em")
										.style("text-anchor", "middle")
										.style("fill", "white")
										.attr("class", "on")
										.text(d.data.label);
									})

									.on("mouseout", function(d) {
										d3.select(this).transition()
												.duration(1000)
												.attr("d", arc)
												.ease("elastic");
											text.remove();
										});

							renderarcs.append('text')
								.attr('transform',function(d) {
									var c = arc.centroid(d);
									console.log(c);
									return "translate(" + c[0] +"," + c[1]+ ")";
								});
							console.log('done piechart')
						}
					});
				}};
		}]);