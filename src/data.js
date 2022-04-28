//need access to name of state
//need access to avg values 
//need avg helper method
//have an array of objects
//need to key into objects, get values
//create a new array of objects?
import { select, json } from "d3";

const calcAvg = function(array) {
    let sum = 0
    let offset = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] === ""){
            sum += 0
            offset += 1
        } else {
            sum += array[i]
        }
    }
    if (sum < 1) {
        return 0
    } else {
        return Math.floor(sum / (array.length - offset));
    }
}
export const compileData = () => {
    let modifiedData = {};
    json('./data/single_family_home_by_state_array.json').then(data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            let stateObj = {};
            const state = data[i];
            const vals = Object.values(state);
            const months2000 = vals.slice(2, 14);
            // console.log(months2000);
            const avgPrice2000 = calcAvg(months2000);
            stateObj[2000] = avgPrice2000;

            const months2001 = vals.slice(14, 26);
            const avgPrice2001 = calcAvg(months2001);
            stateObj[2001] = avgPrice2001;

            const months2002 = vals.slice(26, 38);
            const avgPrice2002 = calcAvg(months2002);
            stateObj[2002] = avgPrice2002;

            const months2003 = vals.slice(38, 50);
            const avgPrice2003 = calcAvg(months2003);
            stateObj[2003] = avgPrice2003;

            const months2004 = vals.slice(50, 62);
            const avgPrice2004 = calcAvg(months2004);
            stateObj[2004] = avgPrice2004;

            const months2005 = vals.slice(62, 74);
            const avgPrice2005 = calcAvg(months2005);
            stateObj[2005] = avgPrice2005;

            const months2006 = vals.slice(74, 86);
            const avgPrice2006 = calcAvg(months2006);
            stateObj[2006] = avgPrice2006;

            const months2007 = vals.slice(86, 98);
            const avgPrice2007 = calcAvg(months2007);
            stateObj[2007] = avgPrice2007;

            const months2008 = vals.slice(98, 110);
            const avgPrice2008 = calcAvg(months2008);
            stateObj[2008] = avgPrice2008;

            const months2009 = vals.slice(110, 122);
            const avgPrice2009 = calcAvg(months2009);
            stateObj[2009] = avgPrice2009;

            const months2010 = vals.slice(122, 134);
            const avgPrice2010 = calcAvg(months2010);
            stateObj[2010] = avgPrice2010;

            const months2011 = vals.slice(134, 146);
            const avgPrice2011 = calcAvg(months2011);
            stateObj[2011] = avgPrice2011;
            
            const months2012 = vals.slice(146, 158);
            const avgPrice2012 = calcAvg(months2012);
            stateObj[2012] = avgPrice2012;
            
            const months2013 = vals.slice(158, 170);
            const avgPrice2013 = calcAvg(months2013);
            stateObj[2013] = avgPrice2013;

            const months2014 = vals.slice(170, 182);
            const avgPrice2014 = calcAvg(months2014);
            stateObj[2014] = avgPrice2014;

            const months2015 = vals.slice(182, 194);
            const avgPrice2015 = calcAvg(months2015);
            stateObj[2015] = avgPrice2015;

            const months2016 = vals.slice(194, 206);
            const avgPrice2016 = calcAvg(months2016);
            stateObj[2016] = avgPrice2016;

            const months2017 = vals.slice(206, 218);
            const avgPrice2017 = calcAvg(months2017);
            stateObj[2017] = avgPrice2017;

            const months2018 = vals.slice(218, 230);
            const avgPrice2018 = calcAvg(months2018);
            stateObj[2018] = avgPrice2018;

            const months2019 = vals.slice(230, 242);
            const avgPrice2019 = calcAvg(months2019);
            stateObj[2019] = avgPrice2019;

            const months2020 = vals.slice(242, 254);
            const avgPrice2020 = calcAvg(months2020);
            stateObj[2020] = avgPrice2020;

            const months2021 = vals.slice(254, 266);
            const avgPrice2021 = calcAvg(months2021);
            stateObj[2021] = avgPrice2021;
            
            const months2022 = vals.slice(266)
            const avgPrice2022 = calcAvg(months2022);
            stateObj[2022] = avgPrice2022;
            const stateName = JSON.stringify(vals[1]);
            // console.log(stateName)
            modifiedData[stateName] = stateObj;
            
        }
    });
    // console.log(Object.getOwnPropertyNames(modifiedData));
    // console.log(modifiedData);

    console.log(Object.getOwnPropertySymbols(modifiedData))
    return modifiedData;
}
