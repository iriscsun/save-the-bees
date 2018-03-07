$.when(
    $.getScript("js/treelayout.js"),
    $.getScript("js/d3-waffle.js"),
    $.getScript("js/linechart.js"),
    $.getScript("js/simulation.js"),
    $.getScript("js/treemap.js"),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){

  function chooseVis(section) {

    if (section == 0) {

			d3.select("#earth-things").remove();

			var svg = d3.select('#vis').append('svg')
				.attr("width", 600)
				.attr("height", 600)
				.attr("id", "bees")
				.append('svg:image')
				.attr({
				  'xlink:href': 'bees.png',
				  x: 25,
				  y: 150,
				  width: 550,
					heigh: 500
				});

    } else if (section == 1) {

			d3.select("#bees").remove();
			d3.select("#waffle1").remove();
      earthlyBees()

    } else if (section == 2) {

			d3.select("#earth-things").remove();
			d3.select("#waffle2").remove();
      drawPesticides()

    } else if (section == 3){

			d3.select("#waffle1").remove();
			d3.select("#simulation").remove();
      drawPesticidesUS()

    } else if (section == 4){

			d3.select("#waffle2").remove();
      drawSimulation()

    } else if (section == 5){

			d3.select("#line-chart").remove();

    } else if (section == 6){
			d3.select("#treemap").remove();

      drawLines()

    } else if (section == 7){
			d3.select("#simulation").remove();
			d3.select("#line-chart").remove();
      drawTreeMap()

    } else {
			d3.select("#treemap").remove();
		}
  }

  var update = function(value) {
    console.log(value);
    switch(value) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
          break;
      case 4:
          break;
      case 5:
          break;
      case 6:
          break;

    }
    chooseVis(value);
  }
  // setup scroll functionality
  var scroll = scroller()
      .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // Pass in desired update function

  // Pass the update function to the scroll object
  scroll.update(update)

});



// function lol() {
//
//   var margin = {top: 20, right: 20, bottom: 70, left: 40},
//       width = 600 - margin.left - margin.right,
//       height = 300 - margin.top - margin.bottom;
//
//   // Parse the date / time
//   var	parseDate = d3.time.format("%Y-%m").parse;
//
//   var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
//
//   var y = d3.scale.linear().range([height, 0]);
//
//   var xAxis = d3.svg.axis()
//       .scale(x)
//       .orient("bottom")
//       .tickFormat(d3.time.format("%Y-%m"));
//
//   var yAxis = d3.svg.axis()
//       .scale(y)
//       .orient("left")
//       .ticks(10);
//
//   var svg = d3.select("#vis").append("svg")
//       .attr("id", "test1")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//       .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
//
//   d3.csv("bar-data.csv", function(error, data) {
//
//       data.forEach(function(d) {
//           d.date = parseDate(d.date);
//           d.value = +d.value;
//       });
//
//     x.domain(data.map(function(d) { return d.date; }));
//     y.domain([0, d3.max(data, function(d) { return d.value; })]);
//
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis)
//       .selectAll("text")
//         .style("text-anchor", "end")
//         .attr("dx", "-.8em")
//         .attr("dy", "-.55em")
//         .attr("transform", "rotate(-90)" );
//
//     svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis)
//       .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", ".71em")
//         .style("text-anchor", "end")
//         .text("Value ($)");
//
//     svg.selectAll("bar")
//         .data(data)
//       .enter().append("rect")
//         .style("fill", "steelblue")
//         .attr("x", function(d) { return x(d.date); })
//         .attr("width", x.rangeBand())
//         .attr("y", function(d) { return y(d.value); })
//         .attr("height", function(d) { return height - y(d.value); });
//
//   });
//
// }
