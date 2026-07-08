const fs = require("fs");
const path = require("path");
const multer = require("multer");

const paymentUploadDir = path.join(process.cwd(), "uploads", "payments");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    fs.mkdirSync(paymentUploadDir, { recursive: true });
    cb(null, paymentUploadDir);
  },
  filename(req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const uploadPaymentProof = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = { uploadPaymentProof };
