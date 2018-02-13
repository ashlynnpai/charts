//main tutorials used:
//https://bl.ocks.org/d3noob/6f082f0e3b820b6bf68b78f2f7786084
//displays cycling times data as a scatterplot color-coded for doping allegations, with additional information in a tooltip
d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(response) {
  var data = response;
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var div = d3.select('.chart').append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var parseTime = d3.timeParse("%M:%S");
  var formatTime = d3.timeFormat("%M:%S");
  var times = data.map(function(d) {
      d.Time = parseTime(d.Time);
      return d.Time;
      })
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  var svg = d3.select(".chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(data, function(d) { return d.Time; }));
  y.domain([d3.max(data, function(d) { return d.Place; }),0]);

  svg.selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("r", 8)
      .attr("cx", function(d) { return x(d.Time); })
      .attr("cy", function(d) { return y(d.Place); })
      .attr("fill", function(d) {
        if (d.Doping.length > 0) {
          return "#af2635";
        }
        return "#2c5422";
      })
      .on("mouseover", function(d) {
          div.transition()
           .duration(200)
           .style("opacity", .9);
          div.html(d.Name + "<br/>" + "Time: " + formatTime(d.Time) +
           "<br/>" + "Place: " + d.Place +
           "<br/>" + "Year: " + d.Year +
           "<br/>" + "Nationality: " + d.Nationality +
           "<br/>" + "Doping Allegation: " + d.Doping
           )
           .style("left", (d3.event.pageX) + "px")
           .style("top", (d3.event.pageY - 28) + "px");
         })
      .on("mouseout", function(d) {
          div.transition()
            .duration(500)
            .style("opacity", 0)
       });

  var xAxis = d3.axisBottom(x)
      .tickFormat(d3.timeFormat("%M:%S"));
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .call(d3.axisLeft(y));

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Ranking");
});
