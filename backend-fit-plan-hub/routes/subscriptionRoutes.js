const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { subscribePlan } = require("../controllers/subscriptionController");

router.post("/subscribe/:planId", auth, subscribePlan);

module.exports = router;
