angular.module('gyldendal.directives', ['d3'])
		.directive('d3Chart', ['d3Service', '$window', function(d3Service, $window) {
			return {
				restrict: 'EA',
				template: "<div class='d3container'></div>",
				scope: {
					data: '=' // bi-directional data-binding
				},
				link: function(scope, ele, attrs) {
//					Load d3 service
					d3Service.d3().then(function(d3) {
						console.log('render chart');

//						initialize base svg object on div.d3container
						var svg = d3.select(".d3container");

						// Browser onresize event
						window.onresize = function() {
							scope.$apply();
						};

						// Watch for resize event
						scope.$watch(function() {
							return angular.element($window)[0].innerWidth;
							// ----------------Check for type and render accordingly ----------------
						}, function() {
							if(attrs.type == 'bar'){
								scope.renderbar(scope.data);
							}
							else if(attrs.type == 'pie'){
								scope.renderpie(scope.data);
							}
							else if(attrs.type == 'list'){
								scope.renderlist();
							}
							else if(attrs.type == 'line'){
								scope.renderline(scope.data);
							}
						});

						// -------------	D3 function for rendering bar ----------------
						scope.renderbar = function(data) {
							// remove all previous items before render
							svg.selectAll('*').remove();

							// If we don't pass any data, return out of the element
							if (!data) return;

							draw(data);

							function draw(data) {
								var margin = {
											"top": 10,
											"right": 10,
											"bottom": 30,
											"left": 50
										},
										width = 500,
										height = 300,
										barPad = .1;

								var x = d3.scale.ordinal()
										.domain(data.regions.map(function(d) {
											// Splices string and only shows 2 first characters
											return d.substring(0, 2);
										}))
										.rangeRoundBands([0, width], 0,0);


								var y = d3.scale.linear()
										.domain([0, d3.max(data.institutions)])
										.range([height, 0]);

								var xAxis = d3.svg.axis().scale(x).orient("bottom");

								var yAxis = d3.svg.axis().scale(y).orient("left");

								svg = d3.select(".d3container")
									.append('svg')
									.style('width', '100%')
									.style('height', '375px')
									.attr("class", "chart")
									.attr("width", width + margin.left + margin.right)
									.attr("height", height + margin.top + margin.bottom).append("g")
									.attr("transform", "translate(" + margin.left + "," + margin.right + ")");

								svg.append("g")
									.attr("class", "x axis")
									.attr("transform", "translate( "+20+"," + height + ")")
									.attr("dy", ".71em")
									.style("text-anchor", "end")
									.call(xAxis)
									.append("text")
									.attr("y", 16)
									.attr("transform", "translate( " + width + ", "+ 20 +")")
									.attr("dy", ".71em")
									.text("Værdi X");

								svg.append("g")
									.attr("class", "y axis").call(yAxis)
									.append("text")
									.attr("transform", "rotate(-90)")
									.attr("y", 6)
									.attr("dy", ".71em")
									.style("text-anchor", "end")
									.text("Værdi Y");

								svg.selectAll(".bar").data(data.institutions).enter().append("rect")
									.attr("class", "bar")
									.attr("transform", "translate( "+ 20 + "," + -20 + ")")
									.attr("x", function(d, i) {
										return i * x.rangeBand();
									})
									.attr("y", function(d) {
										return y(d);
									})
									.attr("width", function(){
										return x.rangeBand();
									})
									.attr("height", function(d) {
										return height -y(d);
									});
							}
						};

// -------------	D3 function for rendering bar ----------------
						scope.renderlist = function() {
							// remove all previous items before render
							svg.selectAll('*').remove();
						};

//---------------- D3 function for rendering pie chart----------------
						scope.renderpie = function(data) {

							// remove all previous items before render
							svg.selectAll('*').remove();

							// If we don't pass any data, return out of the element
							if (!data) return;

							svg = d3.select(".d3container")
								.append('svg')
								.style('width', '100%')
								.style('height', '375px');

							var text;

							var colors = ['black', 'red'];

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
								.style('stroke', 'white')
								.style('stroke-width', '1.8')
								.style('fill', 'none')
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
										.style('stroke', 'none')
										.style("text-anchor", "middle")
										.style("fill", "white")
										.style('pointer-events' , 'none')
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
									return "translate(" + c[0] +"," + c[1]+ ")";
								});
						};

						//---------------- D3 function for rendering line chart----------------
						scope.renderline = function(data) {

							// remove all previous items before render
							svg.selectAll('*').remove();

							// If we don't pass any data, return out of the element
//							if (!data) return;

							var margin = {top: 20, right: 20, bottom: 30, left: 50},
									width = 960 - margin.left - margin.right,
									height = 500 - margin.top - margin.bottom;

							svg = d3.select(".d3container")
									.append("svg")
									.attr("width", width + margin.left + margin.right)
									.attr("height", height + margin.top + margin.bottom)
									.append("g")
									.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

							var x = d3.time.scale()
									.range([0, width]);

							var y = d3.scale.linear()
									.range([height, 0]);

							var xAxis = d3.svg.axis()
									.scale(x)
									.orient("bottom");

							var yAxis = d3.svg.axis()
									.scale(y)
									.orient("left");

							var line = d3.svg.line()
									.x(function(d) { return x(d.date); })
									.y(function(d) { return y(d.close); });

							x.domain(d3.extent(data, function(d) { return d.date; }));
							y.domain(d3.extent(data, function(d) { return d.close; }));

							svg.append("g")
								.attr("class", "x axis")
								.attr("transform", "translate(0," + height + ")")
								.call(xAxis)
								.append("text")
								.attr("transform", "translate ( "+width / 2 +" , 0)")
								.attr("y", 0)
								.attr("dy", 0)
								.style("text-anchor", "end")
								.text("x værdi");

							svg.append("g")
								.attr("class", "y axis")
								.call(yAxis)
								.append("text")
								.attr("transform", "translate ( 0 , "+height / 2 +") rotate(-90)")
								.attr("x", 0)
								.attr("dy", 0)
								.style("text-anchor", "end")
								.text("Y værdi");

							svg.append("path")
								.datum(data)
								.attr("class", "line")
								.attr("d", line);
						}
					});
				}};
		}]);