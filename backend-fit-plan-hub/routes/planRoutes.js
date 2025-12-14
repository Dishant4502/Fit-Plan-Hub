const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
	createPlan,
	getAllPlans,
	getPlanDetails,
	getPlansByTrainer
} = require("../controllers/planController");

const { getMyPlans, updatePlan, deletePlan } = require("../controllers/planController");

router.post("/", auth, createPlan);
router.get("/", getAllPlans);
router.get("/mine", auth, getMyPlans);
// Public: get plans for a specific trainer
router.get("/trainer/:trainerId", getPlansByTrainer);
router.get("/:id", auth, getPlanDetails);
router.put("/:id", auth, updatePlan);
router.delete("/:id", auth, deletePlan);

module.exports = router;
