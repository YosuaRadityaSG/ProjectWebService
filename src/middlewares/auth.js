const jwt = require("jsonwebtoken");

// Memverifikasi token JWT dari header Authorization: Bearer <token>
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token gaada. Silakan login terlebih dahulu.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, ... } sesuai payload dari Anggota 1
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      success: false,
      message: "Token tidak valid atau sudah kedaluwarsa.",
    });
  }
}

// Membatasi akses hanya untuk role tertentu, dipakai SETELAH authenticate
// Contoh: router.post('/', authenticate, authorize('admin'), controller.create)
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Belum terautentikasi.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Akses ditolak. Hanya role [${allowedRoles.join(", ")}] yang diizinkan.`,
      });
    }

    next();
  };
}

module.exports = { authenticate, authorize };
