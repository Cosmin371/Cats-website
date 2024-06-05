const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use('/images', express.static(__dirname + '/images'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/contact', (req, res) => {
  const {name, email, message} = req.body;
  const newData = {name, email, message};
  const data = JSON.parse(fs.readFileSync('data.json'));
  data.push(newData);

  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

  console.log(`Nume: ${name}, Email: ${email}, Mesaj: ${message}`);
  res.json({ message: 'Mesajul a fost primit' });
});

app.post('/admin', (req, res) => {
  const loginInfo = req.body;
  const data = JSON.parse(fs.readFileSync("admins.json"));
  
  let access = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].username === loginInfo.username && data[i].password === loginInfo.password) {
      access = true;
      res.sendFile(__dirname + '/public/dashboard.html');
    }
  }
  if (!access)
    res.json(__dirname + '/public/login.html');
});

app.get('/data', (req, res) => {
  res.json(JSON.parse(fs.readFileSync('data.json')));
})

/// pagina 404
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

/// deschidere server
app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
