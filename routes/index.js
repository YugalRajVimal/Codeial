const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);
router.use("/posts", require("./posts"));
router.use("/likes", require("./likes"));
router.use("/users", require("./users"));
router.use("/comments", require("./comments"));

module.exports = router;
