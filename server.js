// 'use strict';

// const express = require('express');

// const weatherData = require('./data/weather.json');

// const server = express();

// const PORT = 3050;

// require('dotenv').config();

// const cors=require('cors');
// server.use(cors());

// //http://localhost:3050/city?name=Amman

// server.get('/weather', (req, res) => {
//     const name = req.query.name;
//     const result = weatherData.find((item) => {
//         if (item.city_name === name)
//             return item.data.data[3].lat;
//     })

// const newArr= name.data.map((item)=> {

//     const Arr= [];
//     newArr.push(item.weather.description, item.weather.valid_date)
//     return Arr;
// })

//     res.send(newArr);
// })

// server.listen(PORT, () => {
//     console.log(`hello from server ${PORT}`);
// })





const express = require('express');
require('dotenv').config();
const server = express(); 
const weatherData = require('./data/weather.json');
const cors = require('cors');
server.use(cors());

const PORT = process.env.PORT;


class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

// http://localhost:3050/weather?searchQuery=Amman
server.get('/weather', (req, res) => {

    const searchQuery = req.query.searchQuery;
    const lat = req.query.latitude;
    const lon = req.query.longitudinal;

    const weather = weatherData.find((item) => {
        if (item.city_name === searchQuery || item.lat === lon || item.lon === lat) {
            return (item);
        }
    });


    try {
        const weatherDataArr = weather.data.map(item => {
            const date = item.valid_date;
            const description = `${item.weather.description}`;
            return new Forecast(date, description);
        });
        res.send(weatherDataArr);
    }
    catch (error) {
        res.send('Error! Please enter a valid city');
        console.log(weatherData);
    }
    
});
server.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});