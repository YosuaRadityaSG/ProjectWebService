const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Booking",
    },
    passenger_name: {
      type: String,
      required: true,
      trim: true,
    },
    identity_number: {
      type: String,
      required: true,
      trim: true,
    },
    seat_number: {
      type: String,
      required: true,
      trim: true,
    },
    qr_code: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

module.exports = mongoose.model("Ticket", ticketSchema, "tickets");
