const mysql = require('mysql');

const db = {};

db.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'movies'
});

db.connection.connect((err) => {
  if (err) throw err;
  console.log('Database connected!')
});

db.insert = (values) => {
  db.connection.query('INSERT IGNORE INTO top_movies (title) VALUES ?', [values], (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      console.log('Insert successful');
    }
  });
};

db.getMovies = (callback) => {
  db.connection.query('SELECT title FROM top_movies', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = db;