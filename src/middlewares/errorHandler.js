function errorHandler(err, req, res, next) {
  console.error("Error: ", err);

  // Mongoose validation error (mis. field required tidak diisi lewat model)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validasi data gagal",
      errors: messages,
    });
  }

  // Mongoose duplicate key error (mis. kode stasiun sudah ada / unique constraint)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `Data dengan ${field} '${err.keyValue[field]}' sudah ada.`,
    });
  }

  // Mongoose invalid ObjectId (mis. /api/trains/abc123 yang bukan ObjectId valid)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `ID tidak valid: ${err.value}`,
    });
  }

  // Multer file upload error
  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: `Upload file gagal: ${err.message}`,
    });
  }

  // Fallback untuk error lain yang tidak terduga
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Terjadi kesalahan pada server.",
  });
}

// 404 handler untuk endpoint yang tidak terdaftar
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan.`,
  });
}

module.exports = { errorHandler, notFoundHandler };
