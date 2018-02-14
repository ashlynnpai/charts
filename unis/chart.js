//data from https://trends.collegeboard.org/college-pricing/figures-tables/tuition-fees-flagship-universities-over-time
//tuition in 2017 adjusted dollars

d3.json("https://raw.githubusercontent.com/ashlynnpai/charts/master/unis/data.json", function(response) {
  var data = response;
  var margin = {top: 30, right: 0, bottom: 30, left: 50},
      width = 1000 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  var div = d3.select('.chart').append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var formatTime = d3.timeFormat("%Y");

  var states = d3.set(data.map(function(d) { return d.state; } )).values();

  var x = d3.scaleBand()
      .range([0, width]);
  var y = d3.scaleTime()
      .range([height, 0]);

  var svg = d3.select(".chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  y.domain(d3.extent(data, function(d) { return d.year; }));
  //states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]
  x.domain(states);


  svg.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', function(d) { return x(d.state); })
      .attr('y', function(d) { return y(d.year) - 20; })
      //set colors based on tuition
      .attr('fill', function(d) { return y(d.tuition); })
      .attr('fill', "red")
      .style("stroke", "blue")
      // .on("mouseover", function(d) {
      //     div.transition()
      //      .duration(200)
      //      .style("opacity", .9);
      //     div.html(
      //      )
      //      .style("left", (d3.event.pageX) + "px")
      //      .style("top", (d3.event.pageY - 28) + "px");
      //    })
      // .on("mouseout", function(d) {
      //     div.transition()
      //       .duration(500)
      //       .style("opacity", 0)
      //  });

  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);

  svg.append('g')
    .classed('x axis', true)
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  svg.append('g')
    .classed('y axis', true)
    .call(yAxis);

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Something");
});
