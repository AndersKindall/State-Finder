// import { select, scaleLinear, max, min, csv, scaleBand, axisLeft, axisBottom, scaleOrdinal } from "d3"

export const renderGraph = () => {
    var fileName = "./data/mod_data.csv";
    var years = [
        "2000", "2001", "2002", 
        "2003", "2004", "2005", 
        "2006", "2007", "2008",
        "2009", "2010", "2011",
        "2012", "2013", "2014",
        "2015", "2016", "2017",
        "2018", "2019", "2020",
        "2021", "2022"
    ];
    
    d3.csv(fileName, function(error, data) {
        var stateMap = {};
        data.forEach(function(d) {
            var state = d.state;
            stateMap[state] = [];

            years.forEach(function(field) {
                stateMap[state].push( +d[field] );
            });
        });
        makeVis(stateMap);
    });

    var makeVis = function(stateMap) {
        // Define dimensions of vis
        var margin = { top: 30, right: 50, bottom: 50, left: 80
         };
        var width = 1000 - margin.left - margin.right;
        var height = 600 - margin.top - margin.bottom;

        // Make x scale
        var xScale = d3.scale.ordinal()
            .domain(years)
            .rangeRoundBands([0, width], 0.1);

        // Make y scale, domain will be defined on bar update
        // NEEED TO CHANGE TO GET MINIMUM VALUE
        var yScale = d3.scale.linear()            
            .range([(height), 0])

        // Create canvas
        var canvas = d3.select('.graph-container')
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('class', 'graph')
                .attr('transform', `translate(${margin.left},${margin.top})`);

        // Make x-axis and add to canvas
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')

        canvas.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

        // Make y-axis and add to canvas
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left');
        
        var yAxisHandleForUpdate = canvas.append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

        yAxisHandleForUpdate.append('text')
            .attr('class', 'yLabel')
            .attr('x', margin.left)
            .attr('y', height/20)
            .attr('text-anchor', 'middle')
            // .attr('transform', 'rotate(-90)')
            .text('Price in U.S. Dollars')
            .style('font-size', '12px')
            .style('font-weight', 'bold')

        var updateBars = function(data) {
            // First update y axis domain to match data
            yScale.domain(d3.extent(data));
            yAxisHandleForUpdate.call(yAxis);

            var bars = canvas.selectAll('.bar').data(data);
            //need to change where tooltip is appended, show how it pops up
            
            var toolTip = d3.selectAll('.graph-container')
                .append('div')
                .style('opacity', 0)
                .attr('class', 'tooltip')
                .style('background-color', 'white')
                .style('border', 'solid')
                .style('border-width', '2px')
                .style('border-radius', '5px')
                .style('padding', '5px')
            
            bars.enter()
                .append('rect')
                    .attr('class', 'bar')
                    .attr('x', function(d, i) { return xScale( years[i] ); })
                    .attr('width', xScale.rangeBand())
                    .attr('y', function(d,i) { return yScale(d); })
                    .attr('height', function (d, i) { return height - yScale(d);})
                    .style('opacity', 0.8)
                    .on('mouseenter', function(d) {
                        toolTip
                            .style('opacity', 1)
                        d3.select(this)
                            .style('fill', '#EB1D36')
                            .style('opacity', 1)
                    })
                    .on('mousemove', function(d) {
                        toolTip
                            .html('Average Price of a Single-Family Home: $' + d)
                            .style('left', `${(d3.mouse(this)[0] + 70)}px`)
                            .style('top', `${(d3.mouse(this)[1])}px`)
                    })
                    .on('mouseleave', function(d) {
                        toolTip
                            .style('opacity', 0)
                        d3.select(this)
                            .style('fill', 'black')
                            .style('opacity', 0.8)
                    }
                    )
            bars.transition().duration(250)
                    .attr('y', function(d,i) { return yScale(d); })
                    .attr('height', function(d,i) { return height - yScale(d); })
            
            toolTip.exit().remove();
            bars.exit().remove();
        }
                
                // Helper for dropdown change
        var dropdownChange = function() {
                var newState = d3.select(this).property('value'),
                newData = stateMap[newState];
                    
                updateBars(newData);
        }

        var states = Object.keys(stateMap).sort();

        var dropdown = d3.select('.dropdown-container')
            .insert('select', 'svg')
            .attr('class', 'dropdown-menu')
            .on('change', dropdownChange);

        dropdown.selectAll('option')
                .data(states)
            .enter().append('option')
                .attr('value', function(d) { return d; })
                .text(function (d) {
                    return d[0].toUpperCase() + d.slice(1,d.length)
                });
        
        var initialData = stateMap[ states[0] ];
        updateBars(initialData);


    }
    
}
