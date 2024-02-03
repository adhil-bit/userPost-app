const express = require('express');
const app = express();
const auth = require('./postController');

// Middleware to parse JSON
app.use(express.json());

// Router
app.get('/', (req, res) => {
  res.send('This is the express server');
});

app.post('/post-create', auth.createPost);

app.post('/add-user', auth.addUser);

// Server setup
app.listen(3001, () => {
  console.log('Server is Running');
});
