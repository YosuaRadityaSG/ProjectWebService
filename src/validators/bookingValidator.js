const Joi = require("joi");

const objectId = Joi.string()
  .pattern(/^[a-fA-F0-9]{24}$/)
  .messages({
    "string.empty": "ID wajib diisi",
    "string.pattern.base": "ID harus berupa ObjectId MongoDB yang valid",
  });

const passengerSchema = Joi.object({
  passenger_name: Joi.string().min(2).required().messages({
    "string.empty": "Nama penumpang wajib diisi",
    "any.required": "Nama penumpang wajib diisi",
  }),
  identity_number: Joi.string().min(6).max(30).required().messages({
    "string.empty": "Nomor identitas wajib diisi",
    "any.required": "Nomor identitas wajib diisi",
  }),
  seat_number: Joi.string().min(1).required().messages({
    "string.empty": "Nomor kursi wajib diisi",
    "any.required": "Nomor kursi wajib diisi",
  }),
});

const createBookingSchema = Joi.object({
  user_id: objectId,
  schedule_id: objectId.required().messages({
    "any.required": "Schedule ID wajib diisi",
  }),
  passengers: Joi.array().items(passengerSchema).min(1).required().messages({
    "array.base": "Data penumpang harus berupa array",
    "array.min": "Minimal 1 penumpang harus diisi",
    "any.required": "Data penumpang wajib diisi",
  }),
});

module.exports = { createBookingSchema };
