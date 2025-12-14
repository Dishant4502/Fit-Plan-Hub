const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { fullName, email, password, role, specialization } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: fullName,
    email,
    password: hashed,
    role,
    ...(role === "trainer" && { specialization })
  });
  res.json({ message: "Signup successful" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  // Return token and a small user object to match frontend expectations
  res.json({
    token,
    user: { id: user._id, role: user.role, name: user.name, email: user.email },
  });
};

// Get current authenticated user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email role specialization"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};
