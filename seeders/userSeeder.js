const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const rawUsers = [
  {
    _id: new mongoose.Types.ObjectId("6a3685c104cb62a3af4b1043"),
    name: "Admin KAI",
    email: "admin@kai.id",
    password: "admin123",
    role: "admin",
    avatar: null,
    created_at: new Date("2026-06-20T12:21:21.848Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("6a3685c104cb62a3af4b1044"),
    name: "Budi Santoso",
    email: "budi@gmail.com",
    password: "budi123",
    role: "user",
    avatar: null,
    created_at: new Date("2026-06-20T12:21:21.848Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("6a3685c104cb62a3af4b1045"),
    name: "Siti Aminah",
    email: "siti@yahoo.com",
    password: "siti123",
    role: "user",
    avatar: null,
    created_at: new Date("2026-06-20T12:21:21.848Z"),
  },
];

async function seedUsers() {
  const collection = mongoose.connection.collection("users");

  // Hash passwords before inserting
  const users = await Promise.all(
    rawUsers.map(async (u) => ({
      ...u,
      password: await bcrypt.hash(u.password, 10),
    })),
  );

  await collection.deleteMany({});
  await collection.insertMany(users);

  console.log(`${users.length} users seeded`);
  return users;
}

module.exports = seedUsers;
