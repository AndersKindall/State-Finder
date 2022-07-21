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
            console.log(state)
            stateMap[state] = [];

            years.forEach(function(field) {
                stateMap[state].push( +d[field] );
            });
        });
        console.log(stateMap)
        makeVis(stateMap);
    });

    var makeVis = function(stateMap) {
        // Define dimensions of vis
        var margin = { top: 20, right: 20, bottom: 40, left: 70 };
        var width = 1200 - margin.left - margin.right;
        var height = 900 - margin.top - margin.bottom;

        // Make x scale
        var xScale = d3.scale.ordinal()
            .domain(years)
            .rangeRoundBands([0, width], 0.1);

        // Make y scale, domain will be defined on bar update
        var yScale = d3.scale.linear()
            .range([height, 0])

        // Create canvas
        var canvas = d3.select('.graph-container')
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

        // Make x-axis and add to canvas
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            // .append('text')
            //     .attr('class', 'xLabel')
            //     .attr('x', width/2)
            //     .attr('y', height - margin.bottom + 12)
            //     .attr('text-anchor', 'middle')
            //     .text('Years')
            //     .style('font-size', '12px')
            //     .style('font-weight', 'bold')
        
        // xAxis.append('text')
        //     .attr('class', 'xLabel')
        //     .attr('x', width/2)
        //     .attr('y', height - margin.bottom + 12)
        //     .attr('text-anchor', 'middle')
        //     .text('Years')
        //     .style('font-size', '12px')
        //     .style('font-weight', 'bold')

        canvas.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

        // Make y-axis and add to canvas
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left');
        
        var yAxisHandleForUpdate = canvas.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        yAxisHandleForUpdate.append('text')
            .attr('class', 'yLabel')
            .attr('x', margin.left - 120)
            .attr('y', height/2)
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text('Price in Dollars')
            .style('font-size', '12px')
            .style('font-weight', 'bold')

        var updateBars = function(data) {
            // First update y axis domain to match data
            yScale.domain(d3.extent(data));
            yAxisHandleForUpdate.call(yAxis);

            var bars = canvas.selectAll('bar').data(data);

            bars.enter()
                .append('rect')
                    .attr('class', 'bar')
                    .attr('x', function(d, i) { return xScale( years[i] ); })
                    .attr('width', xScale.rangeBand())
                    .attr('y', function(d,i) { return yScale(d); })
                    .attr('height', function (d, i) { return height - yScale(d); })
                    .on('mouseenter', function (){
                        d3.select(this)
                            .transition()
                            .duration(300)
                            .style('fill', 'blue')
                    })
                    .on('mouseleave', function () {
                        d3.select(this)
                            .transition()
                            .duration(300)
                            .style('fill', 'black')  
                    })
            bars.transition().duration(250)
                    .attr('y', function(d,i) { return yScale(d); })
                    .attr('height', function(d,i) { return height - yScale(d); })
            
            bars.remove();
        }

        // Helper for dropdown change
        var dropdownChange = function() {
            var newState = d3.select(this).property('value'),
                newData = stateMap[newState];

            updateBars(newData);
        }

        var states = Object.keys(stateMap).sort();

        console.log(states)

        var dropdown = d3.select('.graph-container')
            .insert('select', 'svg')
            .on('change', dropdownChange);

        dropdown.selectAll('option')
                .data(states)
            .enter().append('option')
                .attr('value', function(d) { return d; });
        
        var initialData = stateMap[ states[0] ];
        updateBars(initialData);


    }
    
}
