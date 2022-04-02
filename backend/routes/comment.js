const express = require("express");
const router = express.Router();
const comment_controller = require("../controllers/commentController");

router.post("/createcomment", comment_controller.comment_create);
router.get(
  "/getcommentsbypostid/:post_id",
  comment_controller.comment_get_by_post_id
);

module.exports = router;
