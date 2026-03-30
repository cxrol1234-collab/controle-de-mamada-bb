const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('banco.db');

db.run(`
CREATE TABLE IF NOT EXISTS mamadas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  horario TEXT
)
`);

app.post('/mamadas', (req, res) => {
  const { horario } = req.body;
  db.run('INSERT INTO mamadas (horario) VALUES (?)', [horario]);
  res.send('Salvo');
});

app.get('/mamadas', (req, res) => {
  db.all('SELECT * FROM mamadas', [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});