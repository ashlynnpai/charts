//http://www.puzzlr.org/force-directed-graph-minimal-working-example/


d3.json("https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json", function(graph) {

    var nodes = graph.nodes,
        links = graph.links;

    var width = 1000,
        height = 1000;

    var svg = d3.select(".chart").append("svg")
        .attr("width", width)
        .attr("height", height);


    var simulation = d3.forceSimulation()
        .nodes(nodes)
        .force("charge_force", d3.forceManyBody().strength(-15))
        .force("center_force", d3.forceCenter(width / 2, height / 2))
        .force("link", d3.forceLink(links).distance(10));

    var div = d3.select('.chart').append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("image")
        .data(nodes)
        .enter()
        .append("image")
        .attr("xlink:href", function(d) { return `https://www.ashlynnpai.com/assets/flagspng/${d.code}.png` })
        .attr("width", 20)
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
             div.html(d.country)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
       .on("mouseout", function(d) {
           div.transition()
              .duration(500)
              .style("opacity", 0);
       });;

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "#7D7D7D")
        .attr("stroke-width", 1);

    simulation.on("tick", function() {
        node.attr("x", function(d) {return d.x;})
        .attr("y", function(d) {return d.y;});
        link.attr("x1", function(d) {return d.source.x;})
        .attr("y1", function(d) {return d.source.y;})
        .attr("x2", function(d) {return d.target.x;})
        .attr("y2", function(d) {return d.target.y;});
    });
});
