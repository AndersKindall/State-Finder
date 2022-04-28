import { select, scaleLinear, max, min, csv, scaleBand, axisLeft, axisBottom } from "d3"

export const renderGraph = () => {
    csv('./data/data.csv').then(data => {
        const xValue = d => d.price;
        const yValue = d => d.year;
        const svg = select('svg');
        const width = +svg.attr('width');
        const height = +svg.attr('height');
        const margin = { top: 20, right: 20, bottom: 20, left: 50};
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
            .attr('transform', `translate(${margin.left},${margin})`);
        
        g.append('g').call(axisLeft(yScale));
        g.append('g').call(axisBottom(xScale))
            .attr('transform', `translate(0 ,${innerHeight})`);

        svg.selectAll('rect').data(data)
            .enter().append('rect')
                .attr('y', d => yScale(yValue(d)))
                .attr('width', d => xScale(xValue(d)))
                .attr('height', yScale.bandwidth());
        
        // svg.append('text')
        //     .attr('class', 'yLabel')
        //     .attr('x', -(height/2)-margin)
        //     .attr('y', margin/2 - 20)
        //     .attr('transform', 'rotate(-90)')
        //     .attr('text-anchor', 'middle')
        //     .text('Years')
    });
}
// let state = data[0];
// console.log(Object.keys(state))
// console.log(Object.values(state))
// const state = data[0];
// const years = Object.keys(state).slice(0, 23);
// const prices = Object.values(state);
