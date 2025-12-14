const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  followTrainer,
  unfollowTrainer,
  getFollowedTrainers,
  getTrainerFollowers,
  getMyFollowers
} = require("../controllers/userController");

router.post("/follow/:trainerId", auth, followTrainer);
router.post("/unfollow/:trainerId", auth, unfollowTrainer);
router.get("/following", auth, getFollowedTrainers);
// Protected: get followers for the logged-in trainer (must come before :trainerId route)
router.get("/followers/me", auth, getMyFollowers);
// Public: get followers for a trainer
router.get("/followers/:trainerId", getTrainerFollowers);

module.exports = router;
