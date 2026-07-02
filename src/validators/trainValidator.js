const Joi = require("joi");

const VALID_CLASSES = ["Ekonomi", "Bisnis", "Eksekutif", "Luxury"];

// Dipakai saat POST /api/trains
const createTrainSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.empty": "Nama kereta wajib diisi",
    "any.required": "Nama kereta wajib diisi",
  }),
  class: Joi.string()
    .valid(...VALID_CLASSES)
    .required()
    .messages({
      "any.only": `Kelas kereta harus salah satu dari: ${VALID_CLASSES.join(", ")}`,
      "any.required": "Kelas kereta wajib diisi",
    }),
  capacity: Joi.number().integer().min(1).required().messages({
    "number.base": "Kapasitas harus berupa angka",
    "number.min": "Kapasitas minimal 1",
    "any.required": "Kapasitas wajib diisi",
  }),
});

// Dipakai saat PUT /api/trains/:id — semua field opsional (partial update)
const updateTrainSchema = Joi.object({
  name: Joi.string().min(2),
  class: Joi.string().valid(...VALID_CLASSES),
  capacity: Joi.number().integer().min(1),
}).min(1).messages({
  "object.min": "Minimal 1 field harus diisi untuk update",
});

module.exports = { createTrainSchema, updateTrainSchema };
