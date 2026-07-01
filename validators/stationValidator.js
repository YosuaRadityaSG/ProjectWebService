const Joi = require("joi");

// Dipakai saat POST /api/stations
const createStationSchema = Joi.object({
  code: Joi.string().min(2).max(5).uppercase().required().messages({
    "string.empty": "Kode stasiun wajib diisi",
    "string.min": "Kode stasiun minimal 2 karakter",
    "string.max": "Kode stasiun maksimal 5 karakter",
    "any.required": "Kode stasiun wajib diisi",
  }),
  name: Joi.string().min(2).required().messages({
    "string.empty": "Nama stasiun wajib diisi",
    "any.required": "Nama stasiun wajib diisi",
  }),
  city: Joi.string().min(2).required().messages({
    "string.empty": "Kota wajib diisi",
    "any.required": "Kota wajib diisi",
  }),
});

// Dipake saat PUT /api/stations/:id — semua field opsional (partial update)
const updateStationSchema = Joi.object({
  code: Joi.string().min(2).max(5).uppercase(),
  name: Joi.string().min(2),
  city: Joi.string().min(2),
}).min(1).messages({
  "object.min": "Minimal 1 field harus diisi untuk update",
});

module.exports = { createStationSchema, updateStationSchema };
