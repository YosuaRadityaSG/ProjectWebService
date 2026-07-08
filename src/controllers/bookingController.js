const crypto = require("crypto");
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Ticket = require("../models/Ticket");
const Schedule = require("../models/Schedule");

function generateBookingCode() {
  return `KAI${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function generateQrCode(bookingCode, index) {
  return `QR-${bookingCode}-${String(index + 1).padStart(2, "0")}`;
}

// POST /api/bookings
// Input: 1 booking + banyak penumpang sekaligus
async function createBooking(req, res, next) {
  try {
    const { user_id, schedule_id, passengers } = req.body;
    const bookingUserId = user_id || req.user?.id;

    if (!bookingUserId) {
      return res.status(400).json({
        success: false,
        message: "User ID wajib diisi",
      });
    }

    const schedule = await Schedule.findById(schedule_id);
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Jadwal kereta tidak ditemukan",
      });
    }

    if (
      typeof schedule.available_seats === "number" &&
      schedule.available_seats < passengers.length
    ) {
      return res.status(400).json({
        success: false,
        message: "Kursi tidak cukup untuk jumlah penumpang yang diminta",
      });
    }

    let bookingCode = generateBookingCode();
    let bookingExists = await Booking.exists({ booking_code: bookingCode });
    while (bookingExists) {
      bookingCode = generateBookingCode();
      bookingExists = await Booking.exists({ booking_code: bookingCode });
    }

    const passengerCount = passengers.length;
    const totalPrice = Number(schedule.price) * passengerCount;

    const booking = await Booking.create({
      booking_code: bookingCode,
      user_id: bookingUserId,
      schedule_id,
      passenger_count: passengerCount,
      total_price: totalPrice,
      status: "unpaid",
    });

    const ticketDocs = passengers.map((passenger, index) => ({
      booking_id: booking._id,
      passenger_name: passenger.passenger_name,
      identity_number: passenger.identity_number,
      seat_number: passenger.seat_number,
      qr_code: generateQrCode(booking.booking_code, index),
    }));

    const tickets = await Ticket.insertMany(ticketDocs);

    if (typeof schedule.available_seats === "number") {
      schedule.available_seats -= passengerCount;
      await schedule.save();
    }

    return res.status(201).json({
      success: true,
      message: "Booking berhasil dibuat",
      data: {
        booking,
        tickets,
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/bookings/:booking_code
// Menampilkan detail booking, tiket, QR, dan resi
async function getBookingByCode(req, res, next) {
  try {
    const booking = await Booking.findOne({
      booking_code: req.params.booking_code,
    })
      .populate({
        path: "schedule_id",
        populate: [
          { path: "train_id" },
          { path: "origin_station_id" },
          { path: "destination_station_id" },
        ],
      })
      .lean();

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking tidak ditemukan",
      });
    }

    const tickets = await Ticket.find({ booking_id: booking._id }).lean();

    return res.status(200).json({
      success: true,
      message: "Detail booking berhasil diambil",
      data: {
        ...booking,
        tickets,
        resi: {
          booking_code: booking.booking_code,
          qr_codes: tickets.map((ticket) => ({
            passenger_name: ticket.passenger_name,
            seat_number: ticket.seat_number,
            qr_code: ticket.qr_code,
          })),
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/bookings/:id
// Membatalkan booking + membersihkan data turunannya
async function cancelBooking(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking tidak ditemukan",
      });
    }

    const schedule = await Schedule.findById(booking.schedule_id);

    if (schedule && typeof schedule.available_seats === "number") {
      schedule.available_seats += booking.passenger_count;
      await schedule.save();
    }

    await Ticket.deleteMany({ booking_id: booking._id });

    const paymentCollection = mongoose.connection.collection("payments");
    await paymentCollection.deleteMany({ booking_id: booking._id });

    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking berhasil dibatalkan",
      data: booking,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createBooking,
  getBookingByCode,
  cancelBooking,
};
