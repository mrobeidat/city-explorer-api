

// // http://localhost:3050/weather?searchQuery=Amman


// // https://city-explorer-api-yousef.herokuapp.com/weather?searchQuery=Amman


// // https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=6d85615ad1764c9e93f5aa52c55363d0




'use strict';

require('dotenv').config();

let express = require('express');

let cors = require('cors');


let PORT = process.env.PORT;

let server = express();

server.use(cors());

const getWeather = require('./weather')

const getMovie = require('./movies')

server.get('/movie', getMovie);


// http://localhost:3050/daily?city=Amman&key=6d85615ad1764c9e93f5aa52c55363d0
server.get('/daily', getWeather);

server.get('*', (req, res) => {

    res.status(404).send('Sorry, page not found');
})
server.listen(PORT, () => {

    console.log(`this is my ${PORT}`);
})

