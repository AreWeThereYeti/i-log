angular.module('gyldendal.directives', ['d3'])
		.directive('d3Chart', ['d3Service', '$window', function(d3Service, $window) {
			return {
				restrict: 'EA',
				scope: {
					data: '=' // bi-directional data-binding
				},
				link: function(scope, ele, attrs) {
//					Load d3 service
					d3Service.d3().then(function(d3) {

//						Set height, margin and padding for bars if needed
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

// ----------------Check for type and render accordingly ----------------
							if(attrs.type == 'bar'){
								scope.renderbar(scope.data);
							}
							else if(attrs.type == 'pie'){
								scope.renderpie(scope.data);
							}
						});

// -------------	D3 function for rendering bar ----------------
						scope.renderbar = function(data) {
							// remove all previous items before render
							svg.selectAll('*').remove();

							// If we don't pass any data, return out of the element
							if (!data) return;

							// setup variables
							var width = d3.select(ele[0]).node().offsetWidth - margin,
							// calculate the height
									height = scope.data.length * (barHeight + barPadding),
							// Use the category20() scale function for multicolor support
									color = d3.scale.category20(),
							// our xScale
									xScale = d3.scale.linear()
											.domain([0, d3.max(data, function(d) {
												return d.score;
											})])
											.range([0, width]);

							// set the height based on the calculations above
							svg.attr('height', height);

							//create the rectangles for the bar chart
							svg.selectAll('rect')
								.data(data).enter()
								.append('rect')
								.attr('height', barHeight)
								.attr('width', 140)
								.attr('x', Math.round(margin/2))
								.attr('y', function(d,i) {
									return i * (barHeight + barPadding);
								})
								.attr('fill', function(d) { return color(d.score); })
								.transition()
								.duration(1000)
								.attr('width', function(d) {
									return xScale(d.score);
							});
							console.log('done barchart')
						}

//---------------- D3 function for rendering pie chart----------------
						scope.renderpie = function(data) {

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