//main tutorials used:
//https://www.pshrmn.com/tutorials/d3/bar-charts/
//https://bl.ocks.org/d3noob/257c360b3650b9f0a52dd8257d7a2d73
//displays US GDP over time as a bar chart, with details in a tooltip
d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(response) {
  var data = response.data;

  var parseDate = d3.timeParse("%Y-%m-%d");
  var quarters = data.map(function(d) {
    d[0] = parseDate(d[0]);
    return d[0];
  })

  var div = d3.select('.chart').append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
  var formatTime = d3.timeFormat("%B %Y");

  var margin = {top: 5, right: 5, bottom: 50, left: 100};
  var fullWidth = 900;
  var fullHeight = 500;
  var width = fullWidth - margin.right - margin.left;
  var height = fullHeight - margin.top - margin.bottom;
  var svg = d3.select('.chart').append('svg')
    .attr('width', fullWidth)
    .attr('height', fullHeight)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var xScale = d3.scaleBand()
    .domain(quarters)
    .range([0, width])
    .paddingInner(0.1);

  var bandwidth = xScale.bandwidth();

  var maxY = d3.max(data, function(d) { return d[1]; });
  var yScale = d3.scaleLinear()
    .domain([0, maxY])
    .range([height, 0])
    .nice();

  var xAxis = d3.axisBottom(xScale)
  .tickValues(xScale.domain().filter(function(d,i){ return !(i%17)}))
  .tickFormat(d3.timeFormat("%Y"));
  var yAxis = d3.axisLeft(yScale);

  svg.append('g')
    .classed('x axis', true)
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  var yAxisEle = svg.append('g')
    .classed('y axis', true)
    .call(yAxis);

  var barHolder = svg.append('g')
    .classed('bar-holder', true);

  var bars = barHolder.selectAll('rect.bar')
      .data(data)
      .enter().append('rect')
      .classed('bar', true)
      .attr('x', function(d, i) {
        return xScale(d[0])
      })
      .attr('width', bandwidth)
      .attr('y', function(d) {
        return yScale(d[1]);
      })
      .attr('height', function(d) {
        return height - yScale(d[1]);
      })
      .attr('fill', '#484452')
      .on("mouseover", function(d) {
        div.transition()
         .duration(200)
         .style("opacity", .9);
        div.html(formatTime(d[0]) + "<br/>" + "$" + d[1])
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
      .on("mouseout", function(d) {
        div.transition()
         .duration(500)
         .style("opacity", 0);
       });
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("In Billions");
  });
