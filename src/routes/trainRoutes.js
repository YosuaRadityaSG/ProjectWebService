const express = require("express");
const router = express.Router();

const {
  getAllTrains,
  getTrainById,
  createTrain,
  updateTrain,
  deleteTrain,
} = require("../controllers/trainController");

const validate = require("../middlewares/validate");
const { authenticate, authorize } = require("../middlewares/auth");
const {
  createTrainSchema,
  updateTrainSchema,
} = require("../validators/trainValidator");

// Public
router.get("/", getAllTrains);
router.get("/:id", getTrainById);

// Admin only
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createTrainSchema),
  createTrain
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(updateTrainSchema),
  updateTrain
);

router.delete("/:id", authenticate, authorize("admin"), deleteTrain);

module.exports = router;
