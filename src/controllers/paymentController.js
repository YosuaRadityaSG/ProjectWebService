const crypto = require("crypto");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");

function generateTransactionId() {
  return `TRX${Date.now().toString().slice(-10)}${crypto
    .randomBytes(2)
    .toString("hex")
    .toUpperCase()}`;
}

// PUT /api/payments/:booking_id
// Upload bukti pembayaran memakai Multer dan Payment model
async function uploadPaymentProof(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.booking_id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking tidak ditemukan",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking sudah dibatalkan",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File bukti pembayaran wajib diupload",
      });
    }

    const paymentMethod = req.body.payment_method || "Bank Transfer";
    const amount = req.body.amount
      ? Number(req.body.amount)
      : booking.total_price;

    if (Number.isNaN(amount) || amount < 0) {
      return res.status(400).json({
        success: false,
        message: "Nominal pembayaran tidak valid",
      });
    }

    const paymentData = {
      booking_id: booking._id,
      transaction_id: generateTransactionId(),
      amount,
      payment_method: paymentMethod,
      payment_proof_url: `uploads/payments/${req.file.filename}`,
      status: "success",
    };

    const payment = await Payment.findOneAndUpdate(
      { booking_id: booking._id },
      paymentData,
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    booking.status = "paid";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Bukti pembayaran berhasil diupload",
      data: payment,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadPaymentProof };
