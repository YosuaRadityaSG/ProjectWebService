const Station = require("../src/models/Station");

const stationData = [
  { code: "GMR", name: "Gambir", city: "Jakarta" },
  { code: "SGU", name: "Surabaya Gubeng", city: "Surabaya" },
  { code: "BD", name: "Bandung", city: "Bandung" },
  { code: "SMC", name: "Semarang Poncol", city: "Semarang" },
];

async function seedStations() {
  await Station.deleteMany({}); // kosongkan dulu supaya tidak duplikat saat re-seed
  const created = await Station.insertMany(stationData);
  console.log(`${created.length} stations seeded`);
  return created;
}

module.exports = seedStations;
