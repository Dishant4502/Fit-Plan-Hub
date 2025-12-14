const User = require("../models/User");
const Plan = require("../models/Plan");
const Payment = require("../models/Payment");

// Helper to generate a simple unique transaction id
function generateTransactionId() {
  return `txn_${Date.now()}_${Math.random().toString(36).slice(2,9)}`;
}

exports.subscribePlan = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const planId = req.params.planId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { paymentMethod, amount, currency = "INR", paymentStatus } = req.body;

    if (!paymentMethod || !["UPI", "Card", "NetBanking"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid or missing paymentMethod" });
    }

    if (paymentStatus !== "SUCCESS" && paymentStatus !== "FAILED") {
      return res.status(400).json({ message: "paymentStatus must be either SUCCESS or FAILED" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const planPrice = Number(plan.price || 0);
    if (amount === undefined) {
      return res.status(400).json({ message: "amount is required" });
    }

    if (Number(amount) !== planPrice) {
      return res.status(400).json({ message: "Amount does not match plan price" });
    }

    const transactionId = generateTransactionId();
    const paidAt = paymentStatus === "SUCCESS" ? new Date() : null;

    const paymentRecord = new Payment({
      userId,
      planId,
      amount: Number(amount),
      currency,
      paymentMethod,
      transactionId,
      paymentStatus,
      paidAt,
      subscriptionStatus: paymentStatus === "SUCCESS" ? "ACTIVE" : "FAILED",
    });

    await paymentRecord.save();

    if (paymentStatus !== "SUCCESS") {
      return res.status(402).json({ message: "Payment failed", payment: paymentRecord });
    }

    // Add plan to user's subscribedPlans if not already present
    const alreadySubscribed = user.subscribedPlans.some(id => id.toString() === planId);
    if (!alreadySubscribed) {
      user.subscribedPlans.push(planId);
      await user.save();
    }

    return res.json({ message: "Subscription successful", payment: paymentRecord });
  } catch (err) {
    console.error("subscribePlan error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
