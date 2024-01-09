const express = require("express");
const router = express.Router();

const comments = [];

router
  .route("/")
  .get((req, res) => {
    res.json(comments);
  })
  .post((req, res) => {
    if (req.body.userId && req.body.postId && req.body.body) {
      const comment = {
        id: comments.length + 1,
        userId: req.body.userId,
        postId: req.body.postId,
        body: req.body.body,
      };
      comments.push(comment);
      res.json(comments[comment.length - 1]);
    } else res.json({ error: "Insufficient data" });
  });
router
  .route("/:id")
  .get((req, res, next) => {
    const comment = comments.find((c) => c.id == req.params.id);
    if (comment) res.json(comment);
    else next();
  })
  .patch((req, res, next) => {
    const comment = comments.find((c, i) => {
      if (c.id == req.params.id) {
        for (const key in req.body) {
          comments[i][key] = req.body[key];
        }
        return true;
      }
    });
    if(comment) res.json(comment)
    else next();
  });
module.exports = router;
