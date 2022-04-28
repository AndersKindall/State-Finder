import { select, scaleLinear, max, min, csv, scaleBand, axisLeft, axisBottom } from "d3"

export const renderGraph = () => {
    csv('./data/data.csv').then(data => {
        const xValue = d => d.price;
        const yValue = d => d.year;
        const svg = select('svg');
        const width = +svg.attr('width');
        const height = +svg.attr('height');
        const margin = { top: 20, right: 20, bottom: 40, left: 70};
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
    
        const xScale = scaleLinear()
            .domain([min(data, xValue), max(data, xValue)])
            .range([0, innerWidth]);

            
        const yScale = scaleBand()
            .domain(data.map(yValue))
            .range([0, innerHeight])
            .padding(0.05);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        g.append('g').call(axisLeft(yScale));
        g.append('g').call(axisBottom(xScale))
            .attr('transform', `translate(0 ,${innerHeight})`);

        svg.selectAll('rect').data(data)
            .enter().append('rect')
                .attr('y', d => yScale(yValue(d)))
                .attr('width', d => xScale(xValue(d)))
                .attr('height', yScale.bandwidth())
                .attr('transform', `translate(${margin.left},${margin.top - 19.5})`)
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
                // .on('click', function () {
                //     g.append('text')
                //         .attr('class', 'price')
                //         .attr('x', margin.right)
                //         .attr('y', margin.top)
                //         .attr('text-anchor', 'middle')
                //         .text(d => `${yValue(d)} Average: $${xValue(d)}`)
                // })
        
        g.append('text') 
            .attr('class', 'yLabel')
            .attr('x', margin.left - 120)
            .attr('y', height/2)
            .attr('text-anchor', 'middle')
            .text('Years')
            .style('font-size', '12px')
            .style('font-weight', 'bold')
       
        g.append('text') 
            .attr('class', 'xLabel')
            .attr('x', width/2)
            .attr('y', height - margin.bottom + 12)
            .attr('text-anchor', 'middle')
            .text('Average Price of Single Family Home in U.S. Dollars')
            .style('font-size', '12px')
            .style('font-weight', 'bold')
    });
}
// let state = data[0];
// console.log(Object.keys(state))
// console.log(Object.values(state))
// const state = data[0];
// const years = Object.keys(state).slice(0, 23);
// const prices = Object.values(state);
