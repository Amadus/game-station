var express = require("express");
var router = express.Router();

const post_controller = require("../controllers/postController");

router.post("/", post_controller.post_create);
router.post("/updatepost", post_controller.post_update);
router.delete("/deletepost", post_controller.post_delete);
router.get("/getpostbyid/:id", post_controller.post_get_by_id);
router.get("/all", post_controller.post_get_all);
router.post("/getpostsbyfilters", post_controller.post_get_by_filters);

module.exports = router;
