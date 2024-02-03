const express = require('express');
const app = express();
const auth = require('./postController');
const rateLimit = require('express-rate-limit');

// Middleware to parse JSON
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
  });
app.use(limiter);//to prevent DDos attack

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
