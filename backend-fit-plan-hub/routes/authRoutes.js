const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { signup, login, getProfile } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
// Protected: get current user profile
router.get("/profile", auth, getProfile);

module.exports = router;
