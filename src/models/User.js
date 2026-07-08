const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String },
    // Tambahkan di dalam file models/User.js kamu
    google_refresh_token: {
      type: String,
      default: null, // Default null karena tidak semua user mau menghubungkan kalender
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema, "users");
