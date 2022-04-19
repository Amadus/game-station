const express = require("express");
const router = express.Router();
const history_controller = require("../controllers/historyController");

router.post("/", history_controller.history_post);
router.get("/byuser/:user_id", history_controller.history_get_by_user);

module.exports = router;
