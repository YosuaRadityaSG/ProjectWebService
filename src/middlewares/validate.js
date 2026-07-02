function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // kumpulkan semua error, bukan cuma error pertama
      stripUnknown: true, // buang field yang tidak terdaftar di schema
    });

    if (error) {
      const details = error.details.map((d) => d.message);
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: details,
      });
    }

    req.body = value; // pakai value yang sudah divalidasi & dibersihkan
    next();
  };
}

module.exports = validate;
