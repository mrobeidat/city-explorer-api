'use strict';


require('dotenv').config();
const axios = require('axios');


const Memory = {};


function getMovie(req, res) {

  let query = req.query.searchQuery;
  // let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_key}&query=${query}`;

  if (Memory[query] !== undefined) {
    res.send(Memory[query]);
  } 


  else 
  {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_key}&query=${query}`;

    axios
      .get(url)
      .then(result => {

        let newMovie = result.data.results.map(item => {
          return new Movie(item);

        })
        Memory[query] = newMovie;
        res.send(newMovie)
      })
      .catch(err => console.log(err))
  }
}
  class Movie {

    constructor(item) {

      this.title = item.title;
      this.overview = item.overview;
      this.average_votes = item.vote_average;
      this.total_votes = item.vote_count;
      this.image_url = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
      this.popularity = item.popularity;
      this.released_on = item.release_date;

    }
  }

  module.exports = getMovie;