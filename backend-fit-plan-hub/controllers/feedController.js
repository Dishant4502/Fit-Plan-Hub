const User = require("../models/User");
const Plan = require("../models/Plan");

exports.getUserFeed = async (req, res) => {
  const user = await User.findById(req.user.id);

  const plans = await Plan.find({
    trainer: { $in: user.followingTrainers }
  }).populate("trainer", "name");

  const feed = plans.map(plan => ({
    _id: plan._id,
    title: plan.title,
    price: plan.price,
    duration: plan.duration,
    trainer: plan.trainer.name,
    subscribed: user.subscribedPlans.includes(plan._id)
  }));

  res.json(feed);
};
