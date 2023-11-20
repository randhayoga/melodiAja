const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8069;

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'melodiaja'
});

// Koneksikan ke database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registrasi pengguna
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Validasi data
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Semua bidang harus diisi.' });
  }

  // Periksa apakah pengguna sudah ada
  db.query('SELECT * FROM pengguna WHERE username = ? OR email = ?', [username, email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ error: 'Error checking user' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Username atau email sudah digunakan.' });
    }

    // Tambahkan pengguna baru ke dalam tabel pengguna
    db.query('INSERT INTO pengguna (username, email, kata_sandi) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Error creating user' });
      }
      res.status(201).json({ message: 'Registrasi berhasil!' });
    });
  });
});

// Login pengguna
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validasi data
  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password diperlukan.' });
  }

  // Periksa apakah pengguna ada dan kata sandinya cocok
  db.query('SELECT * FROM pengguna WHERE username = ? AND kata_sandi = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ error: 'Error checking user' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Kombinasi username dan password salah.' });
    }
    res.status(200).json({ message: 'Login berhasil!' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
