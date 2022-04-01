var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");

router.post("/createuser", user_controller.create_user_post);

module.exports = router;
