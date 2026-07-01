const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      // Kode stasiun haruse ga banyak" kek contohnya: JAK, BDG, SBY, MLG, YOG, KNO, BPN, DPS, BTH, PKU
      minlength: 2,
      maxlength: 5,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    // createdAt & updatedAt otomatis, tapi kita map ke created_at
    // supaya konsisten dengan data dummy yang sudah ada di JSON
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

module.exports = mongoose.model("Station", stationSchema, "stations");
