const mongoose = require("mongoose");

const userData = [
  {
    _id: new mongoose.Types.ObjectId("6a3685c104cb62a3af4b1043"),
    name: "Admin KAI",
    email: "admin@kai.id",
    password: "$2b$10$dummyHashAdmin123",
    role: "admin",
    avatar_url: null,
    created_at: new Date("2026-06-20T12:21:21.848Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("6a3685c104cb62a3af4b1044"),
    name: "Budi Santoso",
    email: "budi@gmail.com",
    password: "$2b$10$dummyHashBudi123",
    role: "customer",
    avatar_url: null,
    created_at: new Date("2026-06-20T12:21:21.848Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("6a3685c104cb62a3af4b1045"),
    name: "Siti Aminah",
    email: "siti@yahoo.com",
    password: "$2b$10$dummyHashSiti123",
    role: "customer",
    avatar_url: null,
    created_at: new Date("2026-06-20T12:21:21.848Z"),
  },
];

async function seedUsers() {
  const collection = mongoose.connection.collection("users");

  await collection.deleteMany({});
  await collection.insertMany(userData);

  console.log(`${userData.length} users seeded`);
  return userData;
}

module.exports = seedUsers;
