const mongoose = require("mongoose");

const trainData = [
  {
    _id: new mongoose.Types.ObjectId("6a36876804cb62a3af4b104a"),
    name: "Argo Bromo Anggrek",
    class: "Eksekutif",
    capacity: 400,
    created_at: new Date("2026-06-20T12:28:24.487Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("6a36876804cb62a3af4b104b"),
    name: "Turangga",
    class: "Eksekutif",
    capacity: 400,
    created_at: new Date("2026-06-20T12:28:24.487Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("6a36876804cb62a3af4b104c"),
    name: "Pasundan",
    class: "Ekonomi",
    capacity: 600,
    created_at: new Date("2026-06-20T12:28:24.487Z"),
  },
];

async function seedTrains() {
  const collection = mongoose.connection.collection("trains");

  await collection.deleteMany({});
  await collection.insertMany(trainData);

  console.log(`${trainData.length} trains seeded`);
  return trainData;
}

module.exports = seedTrains;
