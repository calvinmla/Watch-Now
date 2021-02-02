const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('./Client'));

app.get('/', (req, res) => {
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});