const fs = require("fs");
const path = require("path");
const multer = require("multer");

const paymentUploadDir = path.join(process.cwd(), "uploads", "payments");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
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

module.exports = { uploadPaymentProof };

// Avatar upload (untuk user profile)
const avatarUploadDir = path.join(process.cwd(), "uploads", "avatars");

const avatarStorage = multer.diskStorage({
  destination(req, file, cb) {
    fs.mkdirSync(avatarUploadDir, { recursive: true });
    cb(null, avatarUploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-avatar${ext}`);
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = { uploadPaymentProof, uploadAvatar };
