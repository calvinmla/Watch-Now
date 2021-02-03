const fs = require('fs');
const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('./client'));

app.get('/movies', (req, res) => {
  fs.readFile('./client/index.html', 'utf8', (err, file) => {
    if (err) throw err;
    res.status(200).send(file + '</br>' + 'Accessing API');
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});