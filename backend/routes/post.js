var express = require("express");
var router = express.Router();

const post_controller = require("../controllers/postController");

router.post("/", post_controller.post_create);
router.put("/:id", post_controller.post_update);
router.delete("/:id", post_controller.post_delete);
router.get("/all", post_controller.post_get_all);
router.post("/getpostsbyfilters", post_controller.post_get_by_filters);
router.get("/:id", post_controller.post_get_by_id);

module.exports = router;
