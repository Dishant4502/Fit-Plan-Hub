const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "trainer"], required: true },
  specialization: { type: String, required: function() { return this.role === "trainer"; } },
  followingTrainers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  subscribedPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }]
});

module.exports = mongoose.model("User", userSchema);
