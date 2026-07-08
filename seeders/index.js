require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../src/config/db");

const seedUsers = require("./userSeeder");
const seedTrains = require("./trainSeeder");
const seedStations = require("./stationSeeder");
const seedSchedules = require("./scheduleSeeder");
const seedBookings = require("./bookingSeeder");
const seedTickets = require("./ticketSeeder");
const seedPayments = require("./paymentSeeder");

async function runSeeders() {
  try {
    await connectDB();

    console.log("Seedernya sedang jalan");

    // Urutan ini mengikuti relasi antar collection.
    await seedUsers();
    await seedTrains();
    await seedStations();
    await seedSchedules();
    await seedBookings();
    await seedTickets();
    await seedPayments();

    await mongoose.disconnect();
    console.log("Seeder selesai");
    process.exit(0);
  } catch (err) {
    console.error("Seeding gagal:", err);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

runSeeders();
