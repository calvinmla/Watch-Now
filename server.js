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


let pageCounter = 1;

app.get('/movies', (req, res) => {
  accessMovieAPI()
    .then(() => {
      db.getMovies((err, data) => {
        if (err) {
          throw err;
        } else {
          fs.readFile('./client/dist/index.html', 'utf8', (err, file) => {
            if (err) throw err;
            res.send(file + '</br>' + grabRandomMovie(data));
          });
        }
      });
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

/*----------Functions----------*/

const accessMovieAPI = async () => {
  try {
    await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=${pageCounter}`)
      .then((response) => {
        return retrieveMovieTitles(response.data.results);
      })
      .then((movieTitles) => {
        db.insert(movieTitles);
      });
  } catch(error) {
    throw error;
  }
  pageCounter++;
};

const retrieveMovieTitles = (movieAPIArray) => {
  const movies = [];
  for (let i = 0; i < movieAPIArray.length; i++) {
    const tempArray = [];
    tempArray.push(movieAPIArray[i].title);
    movies.push(tempArray);
  }
  return movies;
};

const grabRandomMovie = (databaseMovies) => {
  let numberOfMovies = databaseMovies.length
  let randomNumber = Math.floor(Math.random() * numberOfMovies);
  return databaseMovies[randomNumber].title;
};