const express = require("express");
const router = express.Router();
const {
  register,
  login,
  googleCallback,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

// Rute GET khusus penampung redirect dari Google (WAJIB GET)
router.get("/google/callback", googleCallback);

module.exports = router;
