'use strict';

const express = require('express');

const weatherData = require('./data/weather.json');



const server = express();


const PORT = 3050;

//http://localhost:3050/city?name=Amman

server.get('/city', (req, res) => {
    const name = req.query.name;
    const result = weatherData.find((item) => {
        if (item.city_name === name)
            return item.data.data[3].lat;
    })

const newArr= name.data.map((item)=> {

    const Arr= [];
    newArr.push(item.weather.description, item.weather.valid_date)
    return Arr;
})

    res.send(newArr);
})








server.listen(PORT, () => {


    console.log(`hello from server ${PORT}`);
})