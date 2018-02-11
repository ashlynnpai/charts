//https://www.pshrmn.com/tutorials/d3/bar-charts/
d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(response) {
  var data = response.data;
});


var parseDate = d3.timeParse("%Y-%m-%d");
var quarters = data.map(function(d) {
  d[0] = parseDate(d[0]);
  return d[0];
})


var margin = {top: 5, right: 5, bottom: 50, left: 50};
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
    });
