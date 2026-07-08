const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    train_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Train",
    },
    origin_station_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Station",
    },
    destination_station_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Station",
    },
    departure_time: {
      type: Date,
      required: true,
    },
    arrival_time: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    available_seats: {
      type: Number,
      default: null,
      min: 0,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

module.exports = mongoose.model("Schedule", scheduleSchema, "schedules");
