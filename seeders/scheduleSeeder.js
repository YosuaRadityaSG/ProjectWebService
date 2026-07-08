const mongoose = require("mongoose");

const scheduleData = [
  {
    _id: new mongoose.Types.ObjectId("6a3687a504cb62a3af4b104d"),
    train_id: new mongoose.Types.ObjectId("6a36876804cb62a3af4b104a"),
    origin_station_id: new mongoose.Types.ObjectId("6a36875004cb62a3af4b1046"),
    destination_station_id: new mongoose.Types.ObjectId(
      "6a36875004cb62a3af4b1047",
    ),
    departure_time: new Date("2026-06-20T08:00:00.000Z"),
    arrival_time: new Date("2026-06-20T16:30:00.000Z"),
    price: 600000,
    available_seats: 400,
    created_at: new Date("2026-06-20T12:29:25.759Z"),
  },
];

async function seedSchedules() {
  const collection = mongoose.connection.collection("schedules");

  await collection.deleteMany({});
  await collection.insertMany(scheduleData);

  console.log(`${scheduleData.length} schedules seeded`);
  return scheduleData;
}

module.exports = seedSchedules;
