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

// Serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve images
app.use('/images', express.static(path.join(__dirname, 'images')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});


// POST endpoint for /contact
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Save data to data.json file
  const newData = { name, email, message };
  const data = JSON.parse(fs.readFileSync('data.json'));
  data.push(newData);

  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

  console.log(`Nume: ${name}, Email: ${email}, Mesaj: ${message}`);
  res.json({ message: 'Mesajul a fost primit' });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Listen on the defined port
app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
