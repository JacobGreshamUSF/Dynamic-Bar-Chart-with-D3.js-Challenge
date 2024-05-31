//U59555732
// Dataset
const dataset = [100, 420, 230, 850, 560, 925];

// Define dimensions
const width = 500;
const barHeight = 20;
const margin = 1;
const height = (barHeight + margin) * dataset.length;

// Create linear scale for x-axis
const xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([50, width]);

// Create SVG container
const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

// Create groups for bars
const bars = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0, ${i * (barHeight + margin)})`);

// Append rectangles for bars
bars.append("rect")
    .attr("width", 0) // Start with zero width for transition
    .attr("height", barHeight)
    .style("fill", "steelblue")
    .transition()
    .duration(1000)
    .attr("width", d => xScale(d));

// Append text labels
bars.append("text")
    .attr("x", d => xScale(d) + 5) // Add 5 pixels padding after the bar
    .attr("y", barHeight / 2) // Vertically center the text
    .attr("dy", "0.35em")
    .text(d => d);

// Add hover effect
bars.on("mouseover", function() {
        d3.select(this).select("rect").style("fill", "orange");
    })
    .on("mouseout", function() {
        d3.select(this).select("rect").style("fill", "steelblue");
    });
