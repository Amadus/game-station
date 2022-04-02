var express = require('express');
var router = express.Router();

const post_controller = require("../controllers/postController");

router.post('/createpost', post_controller.post_create);

module.exports = router;
