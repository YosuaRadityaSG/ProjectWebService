const mongoose = require("mongoose");

const bookingData = [
  {
    _id: new mongoose.Types.ObjectId("6a36887304cb62a3af4b104e"),
    booking_code: "KAI99X88Y",
    user_id: new mongoose.Types.ObjectId("6a3685c104cb62a3af4b1044"),
    schedule_id: new mongoose.Types.ObjectId("6a3687a504cb62a3af4b104d"),
    passenger_count: 2,
    total_price: 1200000,
    status: "paid",
    created_at: new Date("2026-06-20T12:32:51.674Z"),
  },
];

async function seedBookings() {
  const collection = mongoose.connection.collection("bookings");

  await collection.deleteMany({});
  await collection.insertMany(bookingData);

  console.log(`${bookingData.length} bookings seeded`);
  return bookingData;
}

module.exports = seedBookings;
