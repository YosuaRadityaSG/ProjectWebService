const express = require("express");
const router = express.Router();

const {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");

const validate = require("../middlewares/validate");
const { authenticate, authorize } = require("../middlewares/auth");
const {
  createStationSchema,
  updateStationSchema,
} = require("../validators/stationValidator");

// Public
router.get("/", getAllStations);
router.get("/:id", getStationById);

// Admin only
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createStationSchema),
  createStation
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(updateStationSchema),
  updateStation
);

router.delete("/:id", authenticate, authorize("admin"), deleteStation);

module.exports = router;
