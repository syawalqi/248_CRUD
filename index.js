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
  console.log(`app listening at http://localhost:${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gms041204#',
  database: 'biodata',
  port: 3309
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.get('/api/mahasiswa', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) {
      console.error('Error fetching mahasiswa data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

app.post('/api/mahasiswa', (req, res) => {
  const { nama, nim, kelas, prodi } = req.body;
  
  if (!nama || !nim || !kelas || !prodi) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query('INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)', 
    [nama, nim, kelas, prodi], 
    (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error inserting data' });
      
    }
    res.status(201).json({ message: 'Mahasiswa added successfully' });
  });
});

app.put('/api/mahasiswa/:id', (req, res) => {
    const UserId = req.params.id;
    const { nama, nim, kelas, prodi } = req.body;
    db.query(
      'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ?, prodi = ? WHERE id = ?',
      [nama, nim, kelas, prodi, UserId],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error updating data' });
        }
        res.json({ message: 'Mahasiswa updated successfully' });
      }
    );
});

app.delete('/api/mahasiswa/:id', (req, res) => {
    const UserId = req.params.id;
    db.query(
      'DELETE FROM mahasiswa WHERE id = ?',
      [UserId],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error deleting data' });
        }
        res.json({ message: 'Mahasiswa deleted successfully' });
      }
    );
});