const fs = require('fs');
const express = require('express');
const axios = require('axios');
const api_key = require('./api-key.js');
const db = require('./db.js');

const app = express();
const port = 8080;

app.use(express.static('./client/dist'));

// API page incrementer
let pageCounter = 1;


app.get('/movies', (req, res) => {
  console.log(pageCounter)
  // Access API
  accessMovieAPI()
    .then(() => {
      // Retrieve movies from database
      db.getMovies((err, data) => {
        if (err) {
          throw err;
        } else {
          // Read home page to access button with GET method
          fs.readFile('./client/dist/index.html', 'utf8', (err, file) => {
            if (err) throw err;
            // Return home page and random movie title
            res.status(200).send(file + '</br>' + grabRandomMovie(data));
          });
        }
      });
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

/*----------Functions----------*/

// Access movie API using Axios
const accessMovieAPI = async () => {
  try {
    for (let i = 1; i <= 5; i++) {
      await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=${i}`)
        .then((response) => {
          // Increment page counter for next GET request
          // pageCounter++;
          // Invoke function to format data to be written to the database
          return retrieveMovieTitles(response.data.results);
        })
        .then((movieTitles) => {
          // Write movie list to the database
          db.insert(movieTitles);
        });
    }
  } catch(error) {
    throw error;
  }
};

// Function to convert API data to be written to database
const retrieveMovieTitles = (movieAPIArray) => {
  const movies = [];
  for (let i = 0; i < movieAPIArray.length; i++) {
    const tempArray = [];
    // Movie titles need to have [] to be converted to () before written to database
    tempArray.push(movieAPIArray[i].title);
    movies.push(tempArray);
  }
  return movies;
};

// Function to grab a random movie from the database
const grabRandomMovie = (databaseMovies) => {
  let numberOfMovies = databaseMovies.length
  let randomNumber = Math.floor(Math.random() * numberOfMovies);
  return databaseMovies[randomNumber].title;
};