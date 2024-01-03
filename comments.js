// Create web server using Express
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Get comments from comments.json
router.get('/', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      console.log('Error reading comments file', err);
      res.status(500).send('Error reading comments file');
    } else {
      const comments = JSON.parse(data);
      res.send(comments);
    }
  });
});

// Add new comment to comments.json
router.post('/', (req, res) => {
  console.log('req.body', req.body);
  const newComment = req.body;
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      console.log('Error reading comments file', err);
      res.status(500).send('Error reading comments file');
    } else {
      const comments = JSON.parse(data);
      comments.push(newComment);
      fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          console.log('Error writing comments file', err);
          res.status(500).send('Error writing comments file');
        } else {
          res.status(201).send(newComment);
        }
      });
    }
  });
});

module.exports = router;