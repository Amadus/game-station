const History = require("../models/history");

const { validationResult } = require("express-validator");

exports.history_post = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors) {
    res.send(errors);
    return;
  }

  History.findOne({
    user: req.body.user,
    post: req.body.post,
  }).exec((err, found_history) => {
    if (err) return next(err);
    if (found_history) {
      found_history.date = Date.now();
      found_history.save((err) => {
        if (err) return next(err);
        res.send("History updated!");
        return;
      });
    } else {
      const history = new History({
        user: req.body.user,
        post: req.body.post,
        date: Date.now(),
      });
      history.save((err) => {
        if (err) return next(err);
        res.send("History saved!");
        return;
      });
    }
  });
};

exports.history_get_by_user = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors) {
    res.send(errors);
    return;
  }

  History.find({ user: req.params.user_id })
    .sort({ date: -1 })
    .populate("post")
    .limit(8)
    .exec((err, found_histories) => {
      if (err) return next(err);
      res.json(found_histories);
    });
};
