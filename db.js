const dotenv = require('dotenv').config();
const mysql = require('mysql');

const db = {};

db.connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE
});

db.connection.connect((err) => {
  if (err) throw err;
  console.log('Database connected!')
});

// Insert movie data from API into the database
db.insert = (values) => {
  db.connection.query('INSERT IGNORE INTO top_movies (title) VALUES ?', [values], (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      console.log('Insert successful');
    }
  });
};

// Retrieve all movies from database
db.getMovies = (callback) => {
  db.connection.query('SELECT title FROM top_movies', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

db.count = (callback) => {
  db.connection.query('SELECT COUNT (title) FROM top_movies', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  })
}

module.exports = db;