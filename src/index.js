import { select, json } from "d3";

window.addEventListener('DOMContentLoaded', (e) => {
    console.log("try again");
    json('./data/single_family_home_by_state_array.json').then(data => {
        // console.log(data);
        const california = data[0];
        const vals = Object.values(california);
        console.log(vals);
        const months2000 = vals.slice(2, 14)
        const months2001 = vals.slice(14, 26);
        const months2002 = vals.slice(26, 38);
        const months2003 = vals.slice(38, 50);
        const months2004 = vals.slice(50, 62);
        const months2005 = vals.slice(62, 74);
        const months2006 = vals.slice(74, 86);
        const months2007 = vals.slice(86, 98);
        const months2008 = vals.slice(98, 110);
        const months2009 = vals.slice(110, 122);
        const months2010 = vals.slice(122, 134);
        const months2011 = vals.slice(134, 146);
        const months2012 = vals.slice(146, 158);
        const months2013 = vals.slice(158, 170);
        const months2014 = vals.slice(170, 182);
        const months2015 = vals.slice(182, 194);
        const months2016 = vals.slice(194, 206);
        const months2017 = vals.slice(206, 218);
        const months2018 = vals.slice(218, 230);
        const months2019 = vals.slice(230, 242);
        const months2020 = vals.slice(242, 254);
        const months2021 = vals.slice(254, 266);
        const months2022 = vals.slice(266)
        console.log(months2022)

        // let yearOne = california.slice(2, 14);
        // console.log(year1)
    });
});

