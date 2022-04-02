const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.create_user_post = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors) {
    res.send(errors);
    return;
  }

  const user = new User({
    _id: req.body._id,
    user_name: req.body.user_name,
    avatar_url: req.body.avatar_url,
  });
  User.findOne({ user_name: req.body.user_name }).exec((err, found_user) => {
    if (err) return next(err);
    if (found_user) {
      res.send("User already exists!");
      return;
    }
    user.save((err) => {
      if (err) return next(err);
      res.send("User created!");
      return;
    });
  });
};

exports.update_user_post = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors) {
    res.send(errors);
    return;
  }

  User.findById(req.body._id).exec((err, found_user) => {
    if (err) return next(err);
    if (found_user) {
      found_user.avatar_url = req.body.avatar_url;
      found_user.save((err) => {
        if (err) return next(err);
        res.send("User updated!");
        return;
      });
    } else {
      res.send("User not found!");
      return;
    }
  });
};

exports.get_user_by_name = (req, res, next) => {
  User.findOne({ user_name: req.params.user_name }).exec((err, found_user) => {
    if (err) return next(err);
    if (!found_user) {
      res.send("User not found!");
      return;
    }
    res.json(found_user);
  });
};

exports.get_user_by_id = (req, res, next) => {
  User.findById(req.params.id).exec((err, found_user) => {
    if (err) return next(err);
    if (!found_user) {
      res.send("User not found!");
      return;
    }
    res.json(found_user);
  });
};
