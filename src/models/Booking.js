const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    booking_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    schedule_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Schedule",
    },
    passenger_count: {
      type: Number,
      required: true,
      min: 1,
    },
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["unpaid", "paid", "cancelled"],
      default: "unpaid",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

module.exports = mongoose.model("Booking", bookingSchema, "bookings");
