const Plan = require("../models/Plan");

exports.createPlan = async (req, res) => {
  try {
    const plan = await Plan.create({
      ...req.body,
      trainer: req.user.id
    });
    res.json(plan);
  } catch (err) {
    console.error("createPlan error:", err);
    res.status(500).json({ message: "Server error creating plan" });
  }
};

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().populate("trainer", "name");
    res.json(plans);
  } catch (err) {
    console.error("getAllPlans error:", err);
    res.status(500).json({ message: "Server error fetching plans" });
  }
};

// Get plans for a specific trainer (public)
exports.getPlansByTrainer = async (req, res) => {
  try {
    const trainerId = req.params.trainerId;
    const plans = await Plan.find({ trainer: trainerId }).populate(
      "trainer",
      "name"
    );
    res.json(plans);
  } catch (err) {
    console.error("getPlansByTrainer error:", err);
    res.status(500).json({ message: "Server error fetching trainer plans" });
  }
};

exports.getPlanDetails = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id).populate("trainer", "name");

    if (!req.user.subscribedPlans?.includes(plan._id)) {
      return res.json({
        title: plan.title,
        price: plan.price,
        trainer: plan.trainer.name
      });
    }

    res.json(plan);
  } catch (err) {
    console.error("getPlanDetails error:", err);
    res.status(500).json({ message: "Server error fetching plan details" });
  }
};

exports.getMyPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ trainer: req.user.id });
    res.json(plans);
  } catch (err) {
    console.error("getMyPlans error:", err);
    res.status(500).json({ message: "Server error fetching your plans" });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    if (plan.trainer.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(plan, req.body);
    await plan.save();
    res.json(plan);
  } catch (err) {
    console.error("updatePlan error:", err);
    res.status(500).json({ message: "Server error updating plan" });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    if (plan.trainer.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted" });
  } catch (err) {
    console.error("deletePlan error:", err);
    res.status(500).json({ message: "Server error deleting plan" });
  }
};
