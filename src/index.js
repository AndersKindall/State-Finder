import { select, json } from "d3";

window.addEventListener('DOMContentLoaded', (e) => {
    console.log("try again");
    json('./data/single_family_home_by_state_array.json').then(data => {
        console.log(data);
    });
});

