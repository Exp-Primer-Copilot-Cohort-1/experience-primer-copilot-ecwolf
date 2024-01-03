// Create a web server
// Start the web server

// Load the express module
const express = require('express');
const app = express();
const port = 3000;
const comments = require('./data/comments');

// Set view engine to ejs
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    comments: comments.comments,
  });
});

// About route
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

// Comments route
app.get('/comments', (req, res) => {
  res.render('comments', {
    title: 'Comments',
    comments: comments.comments,
  });
});

// Comment route
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  res.render('comment', {
    title: 'Comment',
    comment: comments.comments[id],
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});