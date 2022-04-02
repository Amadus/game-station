const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

const async = require("async");
const { validationResult } = require("express-validator");

exports.comment_create = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors) {
      res.send(errors);
      return;
    }

    const comment = new Comment({
        user: req.body.user,
        date: Date.now(),
        content: req.body.content,
        post: req.body.post
    });
    comment.save((err) => {
        if (err) return next(err);
        res.send("Comment created!");
    });
};