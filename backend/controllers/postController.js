const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

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

// 这边其实还需要删除所有相关的comments，现在先不处理
exports.post_delete = (req, res, next) => {
  Post.findById(req.body._id).exec((err, found_post) => {
    if (err) return next(err);
    if (!found_post) {
      res.send("Post not found!");
      return;
    }
    Post.findByIdAndRemove(req.body._id, (err) => {
      if (err) return next(err);
      res.send("Post deleted!");
      return;
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

// exports.game_create_post = [
//   (req, res, next) => {
//     if (!(req.body.tag instanceof Array)) {
//       if (typeof req.body.tag === "undefined") req.body.tag = [];
//       else req.body.tag = new Array(req.body.tag);
//     }
//     next();
//   },

//   body("release_date", "Invalid release date")
//     .optional({ checkFalsy: true })
//     .isISO8601()
//     .toDate(),

//   (req, res, next) => {
//     const errors = validationResult(req);

//     var game = new Game({
//       title: req.body.title,
//       description_snippet: req.body.description_snippet,
//       release_date: req.body.release_date,
//       developer: req.body.developer,
//       tag: req.body.tag,
//       price: req.body.price,
//       positive_rate: req.body.positive_rate,
//     });

//     if (!errors.isEmpty()) {
//       Tag.find()
//         .sort({ name: 1 })
//         .exec(function (err, tags) {
//           if (err) {
//             return next(err);
//           }
//           for (let i = 0; i < tags.length; i++) {
//             if (game.tag.indexOf(tags[i]._id) > -1) {
//               tags[i].checked = "true";
//             }
//           }
//           res.render("game_form", {
//             title: "Crate Game",
//             tags: tags,
//             errors: errors.array(),
//             game: game,
//           });
//         });
//     } else {
//       game.save(function (err) {
//         if (err) {
//           return next(err);
//         }
//         res.redirect(game.url);
//       });
//     }
//   },
// ];

// exports.game_detail = function (req, res, next) {
//   Game.findById(req.params.id)
//     .populate("tag")
//     .exec(function (err, found_game) {
//       if (err) {
//         return next(err);
//       }
//       if (found_game == null) {
//         var notFoundError = new Error("Game not found");
//         notFoundError.status = 404;
//         return next(notFoundError);
//       }
//       res.render("game_detail", { game: found_game });
//     });
// };

// exports.game_list = function (req, res, next) {
//   Game.find()
//     .sort({ title: 1 })
//     .populate("tag")
//     .exec(function (err, list_games) {
//       if (err) {
//         return next(err);
//       }
//       res.render("game_list", { title: "Game List", game_list: list_games });
//     });
// };

// exports.index_page = function (req, res) {
//   async.parallel(
//     {
//       game_count: function (callback) {
//         Game.countDocuments({}, callback);
//       },
//       tag_count: function (callback) {
//         Tag.countDocuments({}, callback);
//       },
//     },
//     function (err, results) {
//       res.render("index", {
//         title: "Game Review Home",
//         error: err,
//         data: results,
//       });
//     }
//   );
// };

// exports.game_create_get = function (req, res, next) {
//   Tag.find()
//     .sort({ name: 1 })
//     .exec(function (err, tags) {
//       if (err) {
//         return next(err);
//       }
//       res.render("game_form", { title: "Create Game", tags: tags });
//     });
// };

// exports.game_update_get = function (req, res, next) {
//   async.parallel(
//     {
//       game: (callback) => {
//         Game.findById(req.params.id).populate("tag").exec(callback);
//       },
//       tags: (callback) => {
//         Tag.find().sort({ name: 1 }).exec(callback);
//       },
//     },
//     (err, results) => {
//       if (err) {
//         return next(err);
//       }
//       if (results.game == null) {
//         var notFoundErr = new Error("Game not found");
//         notFoundErr.status = 404;
//         return next(notFoundErr);
//       }
//       for (
//         let all_tag_iter = 0;
//         all_tag_iter < results.tags.length;
//         all_tag_iter++
//       ) {
//         for (
//           let game_tag_iter = 0;
//           game_tag_iter < results.game.tag.length;
//           game_tag_iter++
//         ) {
//           if (
//             results.tags[all_tag_iter]._id.toString() ===
//             results.game.tag[game_tag_iter]._id.toString()
//           ) {
//             results.tags[all_tag_iter].checked = "true";
//           }
//         }
//       }
//       res.render("game_form", {
//         title: "Update Game",
//         game: results.game,
//         tags: results.tags,
//       });
//     }
//   );
// };

// exports.game_update_post = [
//   (req, res, next) => {
//     if (!(req.body.tag instanceof Array)) {
//       if (typeof req.body.tag === "undefined") req.body.tag = [];
//       else req.body.tag = new Array(req.body.tag);
//     }
//     next();
//   },

//   body("release_date", "Invalid release date")
//     .optional({ checkFalsy: true })
//     .isISO8601()
//     .toDate(),

//   (req, res, next) => {
//     const errors = validationResult(req);

//     var game = new Game({
//       title: req.body.title,
//       description_snippet: req.body.description_snippet,
//       release_date: req.body.release_date,
//       developer: req.body.developer,
//       tag: req.body.tag,
//       price: req.body.price,
//       positive_rate: req.body.positive_rate,
//       _id: req.params.id,
//     });

//     if (!errors.isEmpty()) {
//       Tag.find()
//         .sort({ name: 1 })
//         .exec(function (err, tags) {
//           if (err) {
//             return next(err);
//           }
//           for (let i = 0; i < tags.length; i++) {
//             if (game.tag.indexOf(tags[i]._id) > -1) {
//               tags[i].checked = "true";
//             }
//           }
//           res.render("game_form", {
//             title: "Update Game",
//             tags: tags,
//             errors: errors.array(),
//             game: game,
//           });
//         });
//     } else {
//       Game.findByIdAndUpdate(req.params.id, game, {}, (err, theGame) => {
//         if (err) {
//           return next(err);
//         }
//         res.redirect(theGame.url);
//       });
//     }
//   },
// ];

// exports.game_delete_get = (req, res, next) => {
//   Game.findById(req.params.id)
//     .populate("tag")
//     .exec((err, found_game) => {
//       if (err) {
//         return next(err);
//       }
//       if (found_game == null) {
//         res.redirect("/catalog/games");
//         return;
//       }
//       res.render("game_delete", { game: found_game });
//     });
// };

// exports.game_delete_post = (req, res, next) => {
//   Game.findById(req.body.id).populate('tag').exec((err, found_game) => {
//     if (err) {
//       return next(err);
//     }
//     if (found_game == null) {
//       let notFoundErr = new Error('Game not found');
//       notFoundErr.status = 404;
//       return next(notFoundErr);
//     }
//     Game.findByIdAndRemove(req.body.id, (err) => {
//       if (err) {
//         return next(err);
//       }
//       res.redirect('/catalog/games');
//     });
//   });
// };
