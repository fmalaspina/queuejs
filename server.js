const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let queue = [];

// Serve the static HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get the current queue
app.get('/api/queue', (req, res) => {
  res.json(queue);
});

// API endpoint to add a random number to the queue
app.post('/api/generate', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  if (queue.length >= 5) {
    queue.shift();
  }

  queue.push(randomNumber);
  res.json(queue);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
