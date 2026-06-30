const mongoose = require("mongoose");

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/KAI";
    await mongoose.connect(uri);
    console.log(`MongoDB berhasil connect: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection gagal:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
