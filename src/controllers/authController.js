const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// --- TAMBAHAN GOOGLE CALENDAR ---
// const { getAuthUrl } = require("../utils/googleCalendar");
// --------------------------------

// Tambahkan import saveTokenToUser di bagian paling atas file authController.js
const { getAuthUrl, saveTokenToUser } = require("../utils/googleCalendar");

// ... kode register dan login yang kemarin tetap sama ...

// --- TAMBAHAN FUNGSI UNTUK MENANGKAP CALLBACK GOOGLE ---
async function googleCallback(req, res) {
  try {
    const { code, state } = req.query; // Google mengirimkan 'code' dan 'state' (ID User)

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code tidak ditemukan",
      });
    }

    // Tukar kode menjadi token dan simpan otomatis ke DB User berdasarkan ID dari 'state'
    await saveTokenToUser(code, state);

    return res.json({
      success: true,
      message:
        "Akun Google Calendar berhasil ditautkan! Kolom google_refresh_token di DB Anda sekarang sudah terisi. Kamu bisa lanjut ke step POST booking tiket.",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Gagal memproses token Google." });
  }
}

// Jangan lupa dieksport di bagian paling bawah
module.exports = { register, login, googleCallback };

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Nama, email, dan password dibutuhkan.",
      });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res
        .status(409)
        .json({ success: false, message: "Email sudah terdaftar." });

    const hashed = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashed); // Debugging line to check the hashed password
    const user = new User({ name, email, password: hashed });
    await user.save();

    return res.status(201).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Gagal membuat user." });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email dan password dibutuhkan." });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Email atau password salah." });

    // const match = await bcrypt.compare(password, user.password);
    // if (!match)
    //   return res
    //     .status(401)
    //     .json({ success: false, message: "Email atau password salah." });
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah.",
      });
    }

    const payload = { id: user._id, role: user.role, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secretkey", {
      expiresIn: "30m",
    });

    // --- TAMBAHAN GOOGLE CALENDAR ---
    // Generate URL Login Google untuk user yang sedang login
    const googleAuthUrl = getAuthUrl(user._id);
    // --------------------------------

    return res.json({
      success: true,
      data: {
        token,
        google_auth_url: googleAuthUrl, // <-- Akan muncul di Postman
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Gagal login." });
  }
}

module.exports = { register, login, googleCallback };
