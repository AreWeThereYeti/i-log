angular.module('gyldendal.directives', ['d3'])
		.directive('d3Chart', ['$timeout', 'd3Service', '$window', function($timeout, d3Service, $window) {
			return {
				restrict: 'EA',
				template: "<div class='d3container'></div>",
				scope: {
					data: '=' // bi-directional data-binding
				},
				link: function(scope, ele, attrs) {
//					Load d3 service
					d3Service.d3().then(function(d3) {



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
                $timeout(function(){scope.renderbar(scope.data);},10);
							}
							else if(attrs.type == 'pie'){
                $timeout(function(){scope.renderpie(scope.data);},10);
							}
							else if(attrs.type == 'list'){
								scope.renderlist();
							}
							else if(attrs.type == 'line'){
                $timeout(function(){scope.renderline(scope.data);},10);
							}
              else if(attrs.type == 'dot'){
                $timeout(function(){scope.renderdot(scope.data);},10);
              }
						});

						// -------------	D3 function for rendering bar ----------------
						scope.renderbar = function(data) {

              svg = d3.select(".d3container");

              // remove all previous items before render
							svg.selectAll('*').remove();

							// If we don't pass any data, return out of the element
							if (!data) return;

							draw(data);

							function draw(data) {

								var margin = {top: 30, right: 40, bottom: 30, left: 40},
										width = window.innerWidth - margin.left - margin.right,
										height = 530 - margin.top - margin.bottom;

                var barWidth = 80,
                    barPadding = 20,
                    barPaddingBottom = 100,
                    heightInner = height-barPaddingBottom;

								var x = d3.scale.ordinal()
										.rangeRoundBands([0, width], .1);

								var y = d3.scale.linear()
										.range([height, 0]);

                var yInner = d3.scale.linear()
                  .range([heightInner, 0]);

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

									//x.domain(data.data.map(function(d) { return d.label; }));
									y.domain([0, d3.max(data.data, function(d) { return d.value; })]);

									svg.append("g")
											.attr("class", "x axis")
											.attr("transform", "translate( 0," + height + ")")
											.call(xAxis)
											.style("fill", "e6e6e6");

                   svg.selectAll(".x")
                      .append("g")
                      .append("rect")
                      .attr("class", "domain")
                      .attr("width", 150)
                      .attr("height", 30)
                      .attr("transform", "translate("+(width-150)/2+",-15)")
                      .style("fill", "#ffffff");

                    svg.selectAll(".x")
                      .append("g")
                      .append("text")
                      .attr("class", "domain-text")
											.attr("transform", "translate("+width/2+",7)")
                      .style("text-anchor", "middle")
											.text(data.xtitle)
											.style("fill", "#000000");

									  svg.append("g")
											.attr("class", "y axis")
											.style("fill", "e6e6e6")
											.call(yAxis);

                    svg.selectAll(".y")
                      .append("g")
                      .append("rect")
                      .attr("class", "domain")
                      .attr("width", 30)
                      .attr("height", 200)
                      .attr("transform", "translate(-15,"+(height-200)/2+")")
                      .style("fill", "#ffffff");

                    svg.selectAll(".y")
                      .append("g")
                      .append("text")
                      .attr("class", "domain-text")
                      .style("fill", "000000")
											.attr("transform", "translate(-7,"+ height/2 +") rotate(-90)")
											.attr("dy", ".71em")
											.style("text-anchor", "middle")
											.text(data.ytitle)
											.style("fill", "000000");


                var bar = svg.selectAll(".bar")
                  .data(data.data)
                  .enter()
                  .append("g");

                bar.append("rect")
                  .attr("class", "bar")
                  .attr("transform", "translate( "+ 40 + "," + 0 + ")")
                  .attr("x", function(d,i) { return i*(barWidth+barPadding); })
                  .style("fill", "#e6e6e6")
                  .attr("width", barWidth)
                  .attr("y", function(d) { return y(d.value)/1.27; })
                  .attr("height", function(d) { return (height-y(d.value))/(height/(height-barPaddingBottom)); });

                bar.append("text")
                  .attr("class", "bar-value")
                  .attr("x", function(d,i) { return i*(barWidth+barPadding)+barWidth; })
                  .style("fill", "#e04f2f")
                  .attr("y", function(d) {
                                if(d.value==0){
                                  return y(d.value) / (height / (height - barPaddingBottom));
                                }else {
                                  return 30 + y(d.value) / (height / (height - barPaddingBottom));
                                }
                              })
                  .text(function(d) { return d.value})
                  .style("text-anchor", "middle");

                bar.append("text")
                  .attr("class", "bar-label")
                  .attr("x", function(d,i) { return i*(barWidth+barPadding)+barWidth; })
                  .style("fill", "#000000")
                  .attr("y", function(d,i) {

                    if(i % 2){
                      return height-25;
                    }else {
                      return height-55;
                    }
                  })
                  .text(function(d) { return d.label})
                  .style("text-anchor", "middle");

                bar.append("rect")
                  .attr("class", "bar-line")
                  .attr("x", function(d,i) { return i*(barWidth+barPadding)+barWidth; })
                  .style("fill", "#e6e6e6")
                  .attr("width", 2)
                  .attr("height", function(d,i) {

                    if(i % 2){
                      return 45;
                    }else {
                      return 15;
                    }
                  })
                  .attr("y", height-90 );


							}
						};

// -------------	D3 function for rendering bar ----------------
						scope.renderlist = function() {
							// remove all previous items before render
							svg.selectAll('*').remove();
						};

//---------------- D3 function for rendering pie chart----------------
						scope.renderpie = function(data) {

              svg = d3.select(".d3container");

							// remove all previous items before render
							svg.selectAll('*').remove();

							// If we don't pass any data, return out of the element
							if (!data) return;

							svg = d3.select(".d3container")
								.append('svg')
                .attr("class", "pie")
                .style('width', '575px')
								.style('height', '530px');

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


              // legend
              var legend = d3.select(".d3container").append("svg")
                .attr("class", "legend")
                .attr("width", 200)
                .attr("height", 530)
                .append("text")
                .attr("class", "legend-head")
                .style("fill", "000000")
                .attr("x", 0)
                .attr("y", 0)
                .attr("dy", "0em")
                .style("text-anchor", "start")
                .text(data.xtitle)
                .style("fill", "000000");



              var legendContent = d3.select(".legend").append("svg")
                .attr("class", "legend-content")
                .attr("width", 200)
                .attr("height", 400)
                .attr("y", 25)
                .selectAll("g")
                .data(pie(data.data))
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; });


              legendContent.append("rect")
                .attr("width", 18)
                .attr("height", 20)
                .style("fill", function(d, i) { return colorscale(i); });

              legendContent.append("text")
                .attr("class", "legend-text")
                .attr("x", 24)
                .attr("y", 10)
                .attr("dy", ".35em")
                .text(function(d){

                  return d.data.label });

              legendContent.append("text")
                .attr("class", "legend-percent")
                .attr("x", 100)
                .attr("y", 10)
                .attr("dy", ".35em")
                .text(function(d){
                  var per = ((d.endAngle - d.startAngle)/(2*Math.PI))*100;
                  return " " + per.toFixed(1) + "%" });


						};

						//---------------- D3 function for rendering line chart----------------
						scope.renderline = function(data) {

              svg = d3.select(".d3container");


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
//						initialize base svg object on div.d3container
              var svg = d3.select(".d3container");


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