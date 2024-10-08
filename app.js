const express = require('express');
const app = express();
const auth = require('./controller/postController');
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

app.post('/email-send', auth.sendEmail);

app.get('/get-allpost', auth.getPostDetails)

app.post('/add-user', auth.addUser);

// Server setup
app.listen(3005, () => {
  console.log('Server is Running');
});
