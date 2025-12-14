const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  paymentMethod: { type: String, enum: ["UPI", "Card", "NetBanking"], required: true },
  transactionId: { type: String, required: true, unique: true },
  paymentStatus: { type: String, enum: ["SUCCESS", "FAILED"], required: true },
  paidAt: { type: Date },
  subscriptionStatus: { type: String, enum: ["ACTIVE", "INACTIVE", "FAILED"], default: "INACTIVE" },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
