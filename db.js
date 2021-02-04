const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'movies'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Database connected!')

  connection.query(
    CREATE DATABASE movies;
    USE movies;
    CREATE TABLE top_movies (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(200) NOT NULL
    );
  );
});


module.exports = connection;