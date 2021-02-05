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
  db.connection.query(`INSERT INTO top_movies (title) VALUES (?)`, values, (err, result) => {
    if (err) throw err;
    console.log('Insert successful');
  });
};

module.exports = db;