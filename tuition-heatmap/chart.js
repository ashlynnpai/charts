//data from https://trends.collegeboard.org/college-pricing/figures-tables/tuition-fees-flagship-universities-over-time
//heat map showing tuition increases over ten years 2017 adjusted dollars

d3.json("https://raw.githubusercontent.com/ashlynnpai/charts/master/unis/data.json", function(response) {
    var data = response;

//set up chart dimensions
    var cellSize = 20;
    var numYears = 11;
    const margin = {top: 30, right: 0, bottom: 30, left: 50},
        width = 1000 - margin.left - margin.right,
        height = cellSize * numYears - 10;
    var x = d3.scaleBand()
        .range([0, width]);
    var y = d3.scaleTime()
        .range([height, 0]);

    const svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //convert time to and from string
    var parseTime = d3.timeParse("%Y");
    var formatTime = d3.timeFormat("%Y");
    const years = data.map((d) => {return parseTime(d.year)});

    //set the values of x and y axes
    const states = d3.set(data.map((d) => {return d.state})).values();
    y.domain(d3.extent(data, d => d.year));
    x.domain(states);

    //takes the range of tuition values and divides by the number of colors
    //assigns a color for each range of values
    var color = d3.scaleQuantize()
    .domain(d3.extent(data, d => d.tuition))
    .range(["#bdb7d6", "#948DB3", "#605885", "#433B67"]);

    //draw the chart
    svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('x', function(d) { return x(d.state); })
        //put the cells on top of the y increments to prevent x-axis labels overlapping
        .attr('y', function(d) { return y(d.year) - cellSize; })
        //set colors based on tuition
        .attr('fill', function(d) { return color(d.tuition); })
        .style("stroke", "#d6cdb7")
        //tooltips
        .on("mouseover", function(d) {
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div.html(d.uni + "<br/>$" + d.tuition)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
            .duration(500)
            .style("opacity", 0)
    });

    //draws the axes
    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y)
        .tickFormat(d3.timeFormat("%Y"));

    svg.append('g')
        .classed('x axis', true)
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .classed('y axis', true)
        .call(yAxis);

    //draws the tooltips
    var div = d3.select(".chart").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //make the legend showing tuition ranges for heat map colors
    var tuition = d3.set(data.map((d) => {return d.tuition})).values();
    tuition.sort(function(a,b){return a - b})
    var q1 = d3.quantile(tuition, .25);
    var q2 = d3.quantile(tuition, .5);
    var q3 = d3.quantile(tuition, .75);
    var q4 = d3.quantile(tuition, 1);
    d3.select("#q1").node().innerHTML = "$0 - $" + q1;
    d3.select("#q2").node().innerHTML = "$" + q1 + " - $" + q2 ;
    d3.select("#q3").node().innerHTML = "$" + q2 + " - $" + q3 ;
    d3.select("#q4").node().innerHTML = "$" + q3 + " - $" + q4 ;
});
