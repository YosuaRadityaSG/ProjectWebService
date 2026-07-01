require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");

const seedTrains = require("./trainSeeder");
const seedStations = require("./stationSeeder");

async function runSeeders() {
  try {
    await connectDB();

    console.log("Seedernya sedang jalan");

    // Urutan ini mengikuti urutan_export.md: trains & stations duluan
    // karena schedules nanti bergantung pada keduanya.
    await seedTrains();
    await seedStations();

    console.log("Seeder selesai");
    process.exit(0);
  } catch (err) {
    console.error("Seeding gagal:", err);
    process.exit(1);
  }
}

runSeeders();
