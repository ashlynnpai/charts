//main tutorials used:
//https://bl.ocks.org/d3noob/6f082f0e3b820b6bf68b78f2f7786084
// d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(response) {
//   var data = response.data;
var data =

    []

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var div = d3.select('.chart').append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // set the ranges
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


      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.Time; }));
      y.domain([d3.max(data, function(d) { return d.Place; }),0]);


      svg.selectAll("dot")
          .data(data)
          .enter().append("circle")
          .attr("r", 5)
          .attr("cx", function(d) { return x(d.Time); })
          .attr("cy", function(d) { return y(d.Place); })
          .on("mouseover", function(d) {
              div.transition()
               .duration(200)
               .style("opacity", .9);
              div.html(d.Name + "<br/>" + "Time: " + formatTime(d.Time) +
               "<br/>" + "Place: " + d.Place +
               "<br/>" + "Year: " + d.Year +
               "<br/>" + "Nationality: " + d.Nationality +
               "<br/>" + "Allegation: " + d.Doping
               )
               .style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
             })
          .on("mouseout", function(d) {
              div.transition()
               .duration(500)
               .style("opacity", 0)
           });


      // Add the X Axis
      var xAxis = d3.axisBottom(x)
          .tickFormat(d3.timeFormat("%M:%S"));
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      // Add the Y Axis
      svg.append("g")
          .call(d3.axisLeft(y));
