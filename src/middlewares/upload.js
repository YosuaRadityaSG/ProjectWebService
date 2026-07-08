const fs = require("fs");
const path = require("path");
const multer = require("multer");

const paymentUploadDir = path.join(process.cwd(), "uploads", "payments");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});

const uploadPaymentProof = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = uploadPaymentProof;
