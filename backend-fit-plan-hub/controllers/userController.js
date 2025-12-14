const User = require("../models/User");

// Follow a trainer
exports.followTrainer = async (req, res) => {
  const userId = req.user.id;
  const trainerId = req.params.trainerId;

  if (userId === trainerId) {
    return res.status(400).json({ message: "Cannot follow yourself" });
  }

  const user = await User.findById(userId);

  if (!user.followingTrainers.includes(trainerId)) {
    user.followingTrainers.push(trainerId);
    await user.save();
  }

  res.json({ message: "Trainer followed successfully" });
};

// Unfollow trainer
exports.unfollowTrainer = async (req, res) => {
  const userId = req.user.id;
  const trainerId = req.params.trainerId;

  const user = await User.findById(userId);

  user.followingTrainers = user.followingTrainers.filter(
    id => id.toString() !== trainerId
  );

  await user.save();

  res.json({ message: "Trainer unfollowed successfully" });
};

// Get followed trainers
exports.getFollowedTrainers = async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("followingTrainers", "name email");

  res.json(user.followingTrainers);
};

// Get followers for a trainer
exports.getTrainerFollowers = async (req, res) => {
  try {
    const trainerId = req.params.trainerId;
    const followers = await User.find({ followingTrainers: trainerId }).select(
      "name email"
    );
    res.json(followers);
  } catch (err) {
    console.error("getTrainerFollowers error:", err);
    res.status(500).json({ message: "Server error fetching followers" });
  }
};

// Get followers for the logged-in trainer
exports.getMyFollowers = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const followers = await User.find({ followingTrainers: trainerId }).select(
      "name email"
    );
    res.json(followers);
  } catch (err) {
    console.error("getMyFollowers error:", err);
    res.status(500).json({ message: "Server error fetching followers" });
  }
};
