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
              else if(attrs.type == 'dot'){
                scope.renderdot(scope.data);
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

								var margin = {top: 20, right: 20, bottom: 30, left: 60},
										width = 860 - margin.left - margin.right,
										height = 500 - margin.top - margin.bottom;

								var x = d3.scale.ordinal()
										.rangeRoundBands([0, width], .1);

								var y = d3.scale.linear()
										.range([height, 0]);

								var xAxis = d3.svg.axis()
										.scale(x)
										.orient("bottom")
                    .ticks(0)
                    .tickSize(0);

								var yAxis = d3.svg.axis()
										.scale(y)
										.orient("left")
                    .ticks(0)
                    .tickSize(0);

								svg = d3.select(".d3container")
										.append("svg")
										.attr("width", width + margin.left + margin.right)
										.attr("height", height + margin.top + margin.bottom)
 										.append("g")
										.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

									x.domain(data.data.map(function(d) { return d.label; }));
									y.domain([0, d3.max(data.data, function(d) { return d.value; })]);

									svg.append("g")
											.attr("class", "x axis")
											.attr("transform", "translate( 0," + height + ")")
											.call(xAxis)
											.style("fill", "e6e6e6")
											.append("text")
											.style("fill", "000000")
											.attr("transform", "translate("+width/2+","+20+")")
											.attr("dy", "-.1em")
											.style("background-color", "white")
											.style("text-anchor", "end")
											.text(data.xtitle)
											.style("fill", "000000");

									svg.append("g")
											.attr("class", "y axis")
											.style("fill", "e6e6e6")
											.call(yAxis)
											.append("text")
											.style("fill", "000000")
											.attr("transform", "translate(0,"+ height/2 +") rotate(-90)")
											.attr("dy", ".71em")
											.style("text-anchor", "end")
											.text(data.ytitle)
											.style("fill", "000000");


                var node = svg.selectAll(".bar")
                  .data(data.data)
                  .enter()
                  .append("g");

                node.append("rect")
                  .attr("class", "bar")
                  .attr("transform", "translate( "+ 20 + "," + -20 + ")")
                  .attr("x", function(d) { return x(d.label); })
                  .style("fill", "#e6e6e6")
                  .attr("width", x.rangeBand())
                  .attr("y", function(d) { return y(d.value); })
                  .attr("height", function(d) { return height - y(d.value); });

                node.append("text")
                  .attr("class", "bar-text")
                  .attr("x", function(d) { return x(d.label)+x.rangeBand()/2; })
                  .style("fill", "#e04f2f")
                  .attr("y", function(d) { return y(d.value); })
                  .text(function(d) { return d.value})
                  .style("text-anchor", "start");


							}
						};

// -------------	D3 function for rendering bar ----------------
						scope.renderlist = function() {
							// remove all previous items before render
							svg.selectAll('*').remove();
						};

//---------------- D3 function for rendering pie chart----------------
						scope.renderpie = function(data) {
//						initialize base svg object on div.d3container
              var svg = d3.select(".d3container");

							// remove all previous items before render
							svg.selectAll('*').remove();

							// If we don't pass any data, return out of the element
							if (!data) return;

							svg = d3.select(".d3container")
								.append('svg')
                .attr("class", "pie")
                .style('width', '575px')
								.style('height', '575px');

							var text;

							var colors = ['black', 'red'];

							var colorscale = d3.scale.linear().domain([0,data.data.length]).range(colors);

							var arc = d3.svg.arc()
								.innerRadius(0)
								.outerRadius(200);

							var arcOver = d3.svg.arc()
								.innerRadius(0)
								.outerRadius(200 + 10);

							var pie = d3.layout.pie()
								.value(function(d){ return d.value; });


							var renderarcs = svg.append('g')
								.attr('transform','translate(285,265)')
								.selectAll('.arc')
								.data(pie(data.data))
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

              // legends
              var legend = d3.select(".d3container").append("svg")
                .attr("class", "legend")
                .attr("width", 200)
                .attr("height", 200 * 2)
                .selectAll("g")
                .data(pie(data.data))
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

              legend.append("rect")
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", function(d, i) { return colorscale(i); });

              legend.append("text")
                .attr("x", 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .text(function(d) { return d.data.label; });


						};

						//---------------- D3 function for rendering line chart----------------
						scope.renderline = function(data) {


							// remove all previous items before render
							svg.selectAll('*').remove();

							// If we don't pass any data, return out of the element
							if (!data) return;



              // Set the dimensions of the canvas / graph
              var margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

              // Parse the date / time
              var parseDate = d3.time.format('%Y-%m-%dT%H:%M:%SZ').parse;

              // Set the ranges
              var x = d3.time.scale().range([0, width]);
              var y = d3.scale.linear().range([height, 0]);

              // Define the axes
              var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(0).tickSize(0);

              var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(0).tickSize(0);

              // Define the line
              var valueline = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.close); });

              // Adds the svg canvas
              svg = d3.select(".d3container")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

              // parse data.date if not parsed allready
/*              if(!data.isParsed) {
                for(var i= 0;i<data.data.length;i++){
                  data.data[i].date = parseDate(data.data[i].date);
                  data.data[i].close = +data.data[i].close;
                }
                data.isParsed = true;
              }*/

              // calculate a date before the min plot date to use as x-axis min scale
              var minDate = new Date(d3.min(data.data, function(d) { return d.date; }) - 8.64e7);

              // Scale the range of the data
              x.domain([minDate, d3.max(data.data, function(d) { return d.date; })]);
              y.domain([0, d3.max(data.data, function(d) { return d.close; })]);

                // Add the valueline path.
              svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data.data))
                .style("fill", "none")
                .style("stroke", "grey")
                .style("stroke-width", 5);


              var node = svg.selectAll("g")
                .data(data.data)
                .enter()
                .append("g");

              node.append("circle")
                .attr("class", "dot")
                .attr("cx", function(d) { return x(d.date); })
                .attr("cy", function(d) { return y(d.close); })
                .attr("r", 12)
                .style("fill", "red");

              node.append("text")
                .attr("x", function(d) { return x(d.date); })
                .attr("y", function(d) { return y(d.close)+30; })
                .text(function(d) { return d.close })
                .style("text-anchor", "middle");


                // Add the X Axis
                svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis)
                  .append("text")
                  .attr("class", "axis-text")
                  .style("fill", "000000")
                  .attr("transform", "translate("+width/2+",0)")
                  .style("text-anchor", "middle")
                  .text(data.xtitle)
                  .style("fill", "000000");

                // Add the Y Axis
                svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                  .append("text")
                  .style("fill", "000000")
                  .attr("transform", "translate(0,"+ height/2 +") rotate(-90)")
                  .attr("dy", ".71em")
                  .style("text-anchor", "middle")
                  .text(data.ytitle)
                  .style("fill", "000000");


						};

//---------------- D3 function for rendering dot chart----------------

            scope.renderdot = function(data) {


              // remove all previous items before render
              svg.selectAll('*').remove();

              // If we don't pass any data, return out of the element
              if (!data) return;



              // Set the dimensions of the canvas / graph
              var margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

              // Parse the date / time
              var parseDate = d3.time.format("%d-%b-%y");

              // Set the ranges
              var x = d3.time.scale().range([0, width]);
              var y = d3.scale.linear().range([height, 0]);

              // Define the axes
              // ticks can be formated through tickFormat()
              var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(6).tickSize(0);

              var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(0).tickSize(0);

              // Define the line
              var valueline = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.close); });

              // Adds the svg canvas
              svg = d3.select(".d3container")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

              // parse data.date if not parsed already
/*              if(!data.isParsed) {
                for(var i= 0;i<data.data.length;i++){
                  data.data[i].dates = parseDate(new Date(data.data[i].date));
                  data.data[i].close = +data.data[i].close;
                }
                data.isParsed = true;
              }*/

              // calculate a date before the min plot date to use as x-axis min scale
              var minDate = new Date(d3.min(data.data, function(d) { return d.date; }) - 8.64e7);

              // Scale the range of the data
              x.domain([minDate, d3.max(data.data, function(d) { return d.date; })]);
              y.domain([0, d3.max(data.data, function(d) { return d.close; })]);



              var node = svg.selectAll("g")
                .data(data.data)
                .enter()
                .append("g");

              node.append("circle")
                .attr("class", "dot")
                .attr("cx", function(d) { return x(d.date); })
                .attr("cy", function(d) { return y(d.close); })
                .attr("r", 12)
                .style("fill", "red");

              node.append("text")
                .attr("x", function(d) { return x(d.date); })
                .attr("y", function(d) { return y(d.close)+30; })
                .text(function(d) { return d.close })
                .style("text-anchor", "middle");


              // Add the X Axis
              svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("class", "axis-text")
                .style("fill", "000000")
                .attr("transform", "translate("+width/2+", 30)")
                .style("text-anchor", "middle")
                .text(data.xtitle)
                .style("fill", "000000");

              // Add the Y Axis
              svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .style("fill", "000000")
                .attr("transform", "translate(0,"+ height/2 +") rotate(-90)")
                .attr("dy", ".71em")
                .style("text-anchor", "middle")
                .text(data.ytitle)
                .style("fill", "000000");


            }
					});
				}};
		}]);