'use strict';

require('dotenv').config();

const axios = require('axios');


const Memory = {};

function getWeatherInfo(req, res) {

    let query = req.query.city;
    // let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${process.env.WEATHER_API_key}`;

    if (Memory[query] != undefined) {
        res.send(Memory[query]);
    } 
    else
    {
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${process.env.WEATHER_API_key}`;
    }
    axios
        .get(url)
        .then(result => {

            let newWeather = result.data.data.map(item => {
                return new Forecast(item);

            })
            Memory[query] = newWeather;
            res.send(newWeather)

        })
        .catch(err => console.log(err))
}


class Forecast {

    constructor(item) {

        this.date = item.valid_date;
        this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with broken clouds${item.weather.description}`;

    }
}
module.exports = getWeatherInfo;