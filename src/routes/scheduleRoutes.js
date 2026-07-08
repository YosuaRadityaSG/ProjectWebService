const express = require("express");
const {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");
const { authenticate, authorize } = require("../middlewares/auth");
const router = express.Router();

router.post("/", authenticate, authorize("admin"), createSchedule);
router.get("/", getSchedules);
router.put(":id", authenticate, authorize("admin"), updateSchedule);
router.delete(":id", authenticate, authorize("admin"), deleteSchedule);

module.exports = router;
