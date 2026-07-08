const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookingByCode,
  cancelBooking,
} = require("../controllers/bookingController");
const validate = require("../middlewares/validate");
const { createBookingSchema } = require("../validators/bookingValidator");

router.post("/", validate(createBookingSchema), createBooking);
router.get("/:booking_code", getBookingByCode);
router.delete("/:id", cancelBooking);

module.exports = router;
