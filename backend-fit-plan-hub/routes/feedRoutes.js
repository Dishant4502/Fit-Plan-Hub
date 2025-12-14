const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getUserFeed } = require("../controllers/feedController");

router.get("/", auth, getUserFeed);

module.exports = router;
