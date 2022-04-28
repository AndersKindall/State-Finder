import { select, scaleLinear, max, min, csv, scaleBand, axisLeft } from "d3"

export const renderGraph = () => {
    csv('./data/data.csv').then(data => {
        const xValue = d => d.price;
        const yValue = d => d.year;
        const svg = select('svg');
        const width = +svg.attr('width');
        const height = +svg.attr('height');
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
    
        const xScale = scaleLinear()
            .domain([min(data, xValue), max(data, xValue)])
            .range([0, innerWidth]);

        const xAsis = axisLeft(xScale);
        const yScale = scaleBand()
            .domain(data.map(yValue))
            .range([0, innerHeight]);

        const g = svg.append('g')
            .attr('transform', `translate${margin.left},${margin.top})`);
        
        svg.selectAll('rect').data(data)
            .enter().append('rect')
                .attr('y', d => yScale(yValue(d)))
                .attr('width', d => xScale(xValue(d)))
                .attr('height', yScale.bandwidth());
        
    });
}
// let state = data[0];
// console.log(Object.keys(state))
// console.log(Object.values(state))
// const state = data[0];
// const years = Object.keys(state).slice(0, 23);
// const prices = Object.values(state);
