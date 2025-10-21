const express = require('express');
let mysql = require('mysql2');
const app = express();  
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'biodata',
  port: 3309
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});