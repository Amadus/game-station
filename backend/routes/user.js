var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");

router.post("/createuser", user_controller.create_user_post);
router.post("/updateuser", user_controller.update_user_post);
router.get("/getuserbyname/:user_name", user_controller.get_user_info);

module.exports = router;
