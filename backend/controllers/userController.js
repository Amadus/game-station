const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.create_user_post = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors) {
    res.send(errors);
    return;
  }

  console.log(req.body);

  const user = new User({
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
