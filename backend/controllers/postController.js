const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const History = require("../models/history");

const async = require("async");
const { validationResult } = require("express-validator");

exports.post_create = [
  (req, res, next) => {
    if (!(req.body.picture_urls instanceof Array)) {
      if (typeof req.body.picture_urls === "undefined")
        req.body.picture_urls = [];
      else req.body.picture_urls = new Array(req.body.picture_urls);
    }
    next();
  },

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors) {
      res.send(errors);
      return;
    }
    const post = new Post({
      title: req.body.title,
      price: req.body.price,
      picture_urls: req.body.picture_urls,
      post_date: Date.now(),
      condition: req.body.condition,
      platform: req.body.platform,
      city: req.body.city,
      postal_code: req.body.postal_code,
      description: req.body.description,
      status: req.body.status,
      seller: req.body.seller,
    });
    post.save((err) => {
      if (err) return next(err);
      res.send("Post created!");
      return;
    });
  },
];

exports.post_update = [
  (req, res, next) => {
    if (!(req.body.picture_urls instanceof Array)) {
      if (typeof req.body.picture_urls === "undefined")
        req.body.picture_urls = [];
      else req.body.picture_urls = new Array(req.body.picture_urls);
    }
    next();
  },

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors) {
      res.send(errors);
      return;
    }
    Post.findById(req.body._id).exec((err, found_post) => {
      if (err) return next(err);
      if (!found_post) {
        res.send("Post not found!");
        return;
      }
      found_post.title = req.body.title;
      found_post.price = req.body.price;
      found_post.picture_urls = req.body.picture_urls;
      found_post.condition = req.body.condition;
      found_post.platform = req.body.platform;
      found_post.city = req.body.city;
      found_post.postal_code = req.body.postal_code;
      found_post.description = req.body.description;
      found_post.status = req.body.status;
      found_post.seller = req.body.seller;
      found_post.save((err) => {
        if (err) return next(err);
        res.send("Post updated!");
        return;
      });
    });
  },
];

exports.post_delete = (req, res, next) => {
  Post.findById(req.params.id).exec((err, found_post) => {
    if (err) return next(err);
    if (!found_post) {
      res.send("Post not found!");
      return;
    }
    Comment.deleteMany({ post: found_post._id }).exec((err) => {
      if (err) return next(err);
      History.deleteMany({ post: found_post._id }).exec((err) => {
        if (err) return next(err);
        Post.findByIdAndRemove(req.params.id, (err) => {
          if (err) return next(err);
          res.send("Post deleted!");
          return;
        });
      });
    });
  });
};

exports.post_get_by_id = (req, res, next) => {
  Post.findById(req.params.id)
    .populate("seller")
    .exec((err, found_post) => {
      if (err) return next(err);
      if (!found_post) {
        res.send("Post not found!");
        return;
      }
      res.json(found_post);
    });
};

exports.post_get_all = (req, res, next) => {
  Post.find()
    .sort({ post_date: -1 })
    .populate("seller")
    .exec((err, found_posts) => {
      if (err) return next(err);
      res.json(found_posts);
    });
};

exports.post_get_by_filters = (req, res, next) => {
  const filters = req.body.filters;
  Post.find(filters)
    .sort({ post_date: -1 })
    .populate("seller")
    .exec((err, found_posts) => {
      if (err) return next(err);
      res.json(found_posts);
    });
};
