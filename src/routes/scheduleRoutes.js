const express = require("express");
const {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");
const validate = require("../middlewares/validate");
const { authenticate, authorize } = require("../middlewares/auth");
const {
  createScheduleSchema,
  deleteScheduleParamsSchema,
  getSchedulesQuerySchema,
  updateScheduleSchema,
} = require("../validators/scheduleValidator");
const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createScheduleSchema),
  createSchedule,
);
router.get("/", validate(getSchedulesQuerySchema, "query"), getSchedules);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(updateScheduleSchema),
  updateSchedule,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(deleteScheduleParamsSchema, "params"),
  deleteSchedule,
);

module.exports = router;
