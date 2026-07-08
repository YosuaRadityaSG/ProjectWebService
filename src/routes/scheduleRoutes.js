const express = require("express");
const {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");
const router = express.Router();

router.post("/", createSchedule);
router.get("/", getSchedules);
router.put(":id", updateSchedule);
router.delete(":id", deleteSchedule);

module.exports = router;
