const Train = require("../src/models/Train");

const trainData = [
  { name: "Argo Bromo Anggrek", class: "Eksekutif", capacity: 400 },
  { name: "Turangga", class: "Eksekutif", capacity: 400 },
  { name: "Pasundan", class: "Ekonomi", capacity: 600 },
];

async function seedTrains() {
  await Train.deleteMany({});
  const created = await Train.insertMany(trainData);
  console.log(`${created.length} trains seeded`);
  return created;
}

module.exports = seedTrains;
