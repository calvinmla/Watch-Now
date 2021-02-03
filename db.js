const mysql = require('mysql');

const connectDB = mysql.createConnection({
  host: 'localhost',
  user: 'calvin',
});

connectDB.connect((err) => {
  if (err) throw err;
  console.log('Database connected!')
})