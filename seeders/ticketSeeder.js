const mongoose = require("mongoose");

const ticketData = [
  {
    _id: new mongoose.Types.ObjectId("6a3688ec04cb62a3af4b1050"),
    booking_id: new mongoose.Types.ObjectId("6a36887304cb62a3af4b104e"),
    passenger_name: "Budi Santoso",
    identity_number: "3578012345670001",
    seat_number: "EKS-1-12A",
    qr_code: "QR001",
  },
  {
    _id: new mongoose.Types.ObjectId("6a3688ec04cb62a3af4b1051"),
    booking_id: new mongoose.Types.ObjectId("6a36887304cb62a3af4b104e"),
    passenger_name: "Agus Santoso",
    identity_number: "3578012345670002",
    seat_number: "EKS-1-12B",
    qr_code: "QR002",
  },
];

async function seedTickets() {
  const collection = mongoose.connection.collection("tickets");

  await collection.deleteMany({});
  await collection.insertMany(ticketData);

  console.log(`${ticketData.length} tickets seeded`);
  return ticketData;
}

module.exports = seedTickets;
