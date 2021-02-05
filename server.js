const fs = require('fs');
const express = require('express');
const axios = require('axios');
const api_key = require('./api-key.js');
const db = require('./db.js');
// const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(express.static('./client/dist'));
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/movies', (req, res) => {
  const movie = accessMovieAPI();
  console.log('GET /movie --->', movie);
  res.send(movie);
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

/*----------Functions----------*/

const  accessMovieAPI = async () => {
  let movie;
  try {
    // possibly don't need to use .then after retrieving the data.
    // functions do not need async
    await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=' + api_key)
      .then((response) => {
        // console.log(Array.isArray(response.data.results))
        return retrieveMovieTitles(response.data.results);
      })
      .then((movieTitles) => {
        console.log('database array to insert', movieTitles);
        db.insert(movieTitles);
        return movieTitles;
      })
      .then((movieTitles) => {
        movie = (grabRandomMovie(movieTitles));
      })
  } catch(error) {
    throw error;
  };
  console.log(`data in function ---> ${movie}`)  // need to send this result, not the promise
  return movie;
}

const retrieveMovieTitles = (movieAPIArray) => {
  const movies = [];
  for (let i = 0; i < movieAPIArray.length; i++) {
    // const tempArray = [];
    movies.push(movieAPIArray[i].title);
    // movies.push(tempArray);
  }
  return movies;
}

const grabRandomMovie = (movieTitles) => {
  const numberOfTitles = movieTitles.length;
  const randomNumber = Math.floor(Math.random() * numberOfTitles);
  return movieTitles[randomNumber];
}