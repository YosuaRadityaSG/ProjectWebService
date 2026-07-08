const mongoose = require("mongoose");

const stationData = [
  {
    _id: new mongoose.Types.ObjectId("6a36875004cb62a3af4b1046"),
    code: "GMR",
    name: "Gambir",
    city: "Jakarta",
    created_at: new Date("2026-06-20T12:28:00.489Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("6a36875004cb62a3af4b1047"),
    code: "SGU",
    name: "Surabaya Gubeng",
    city: "Surabaya",
    created_at: new Date("2026-06-20T12:28:00.489Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("6a36875004cb62a3af4b1048"),
    code: "BD",
    name: "Bandung",
    city: "Bandung",
    created_at: new Date("2026-06-20T12:28:00.489Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("6a36875004cb62a3af4b1049"),
    code: "SMC",
    name: "Semarang Poncol",
    city: "Semarang",
    created_at: new Date("2026-06-20T12:28:00.489Z"),
  },
];

async function seedStations() {
  const collection = mongoose.connection.collection("stations");

  await collection.deleteMany({});
  await collection.insertMany(stationData);

  console.log(`${stationData.length} stations seeded`);
  return stationData;
}

module.exports = seedStations;
