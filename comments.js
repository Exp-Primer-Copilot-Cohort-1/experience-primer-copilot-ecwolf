// Create a web server
// 1. Create a new express server
// 2. Create a few routes
//    1. GET /comments - return all comments
//    2. POST /comments - create a new comment
//    3. GET /comments/:id - return a single comment
//    4. PATCH /comments/:id - update a comment
//    5. DELETE /comments/:id - delete a comment
// 3. Start the server and test your work!

const express = require("express");
const app = express();
const port = 3000;
const comments = require("./comments");
const { v4: uuidv4 } = require("uuid");

app.use(express.json());

app.get("/comments", (req, res) => {
  res.send(comments);
});

app.post("/comments", (req, res) => {
  const comment = {
    id: uuidv4(),
    ...req.body,
  };
  comments.push(comment);
  res.send(comment);
});

app.get("/comments/:id", (req, res) => {
  const comment = comments.find((comment) => comment.id === req.params.id);
  if (comment) {
    res.send(comment);
  } else {
    res.status(404).send();
  }
});

app.patch("/comments/:id", (req, res) => {
  const comment = comments.find((comment) => comment.id === req.params.id);
  if (comment) {
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    res.send(comment);
  } else {
    res.status(404).send();
  }
});

app.delete("/comments/:id", (req, res) => {
  const commentIndex = comments.findIndex(
    (comment) => comment.id === req.params.id
  );
  if (commentIndex === -1) {
    res.status(404).send();
  } else {
    comments.splice(commentIndex, 1);
    res.send(comments);
  }
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});