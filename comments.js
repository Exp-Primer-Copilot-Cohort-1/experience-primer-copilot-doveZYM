// Create web server
const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const comments = [
  { id: 1, comment: "Comment 1" },
  { id: 2, comment: "Comment 2" },
  { id: 3, comment: "Comment 3" },
  { id: 4, comment: "Comment 4" },
  { id: 5, comment: "Comment 5" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/comments", (req, res) => {
  res.send(comments);
});

app.get("/api/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment)
    return res
      .status(404)
      .send("The comment with the given ID was not found.");
  res.send(comment);
});

app.post("/api/comments", (req, res) => {
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const comment = {
    id: comments.length + 1,
    comment: req.body.comment,
  };
  comments.push(comment);
  res.send(comment);
});

app.put("/api/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment)
    return res
      .status(404)
      .send("The comment with the given ID was not found.");

  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  comment.comment = req.body.comment;
  res.send(comment);
});

app.delete("/api/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment)
    return res
      .status(404)
      .send("The comment with the given ID was not found.");

  const index = comments.indexOf(comment);
  comments.splice(index, 1);

  res.send(comment);
});

function validateComment(comment) {
    const schema = Joi.object({
        comment: Joi.string().min(),
    });
}
