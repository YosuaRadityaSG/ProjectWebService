const Joi = require("joi");

const objectId = Joi.string()
  .pattern(/^[a-fA-F0-9]{24}$/)
  .messages({
    "string.empty": "ID wajib diisi",
    "string.pattern.base": "ID harus berupa ObjectId MongoDB yang valid",
  });

const scheduleTimeOrder = (value, helpers) => {
  const { departure_time, arrival_time } = value;

  if (departure_time && arrival_time) {
    const departure = new Date(departure_time);
    const arrival = new Date(arrival_time);

    if (arrival <= departure) {
      return helpers.message("Waktu tiba harus setelah waktu berangkat");
    }
  }

  return value;
};

const createScheduleSchema = Joi.object({
  train_id: objectId.required().messages({
    "any.required": "Train ID wajib diisi",
  }),
  origin_station_id: objectId.required().messages({
    "any.required": "Origin station ID wajib diisi",
  }),
  destination_station_id: objectId.required().messages({
    "any.required": "Destination station ID wajib diisi",
  }),
  departure_time: Joi.date().iso().required().messages({
    "date.base": "Waktu berangkat harus berupa tanggal yang valid",
    "date.format": "Waktu berangkat harus menggunakan format ISO",
    "any.required": "Waktu berangkat wajib diisi",
  }),
  arrival_time: Joi.date()
    .iso()
    .greater(Joi.ref("departure_time"))
    .required()
    .messages({
      "date.base": "Waktu tiba harus berupa tanggal yang valid",
      "date.format": "Waktu tiba harus menggunakan format ISO",
      "date.greater": "Waktu tiba harus setelah waktu berangkat",
      "any.required": "Waktu tiba wajib diisi",
    }),
  price: Joi.number().integer().min(0).required().messages({
    "number.base": "Harga harus berupa angka",
    "number.integer": "Harga harus berupa bilangan bulat",
    "number.min": "Harga minimal 0",
    "any.required": "Harga wajib diisi",
  }),
  available_seats: Joi.number().integer().min(0).allow(null).messages({
    "number.base": "Jumlah kursi tersedia harus berupa angka",
    "number.integer": "Jumlah kursi tersedia harus berupa bilangan bulat",
    "number.min": "Jumlah kursi tersedia minimal 0",
  }),
});

const updateScheduleSchema = Joi.object({
  train_id: objectId,
  origin_station_id: objectId,
  destination_station_id: objectId,
  departure_time: Joi.date().iso().messages({
    "date.base": "Waktu berangkat harus berupa tanggal yang valid",
    "date.format": "Waktu berangkat harus menggunakan format ISO",
  }),
  arrival_time: Joi.date().iso().messages({
    "date.base": "Waktu tiba harus berupa tanggal yang valid",
    "date.format": "Waktu tiba harus menggunakan format ISO",
  }),
  price: Joi.number().integer().min(0).messages({
    "number.base": "Harga harus berupa angka",
    "number.integer": "Harga harus berupa bilangan bulat",
    "number.min": "Harga minimal 0",
  }),
  available_seats: Joi.number().integer().min(0).allow(null).messages({
    "number.base": "Jumlah kursi tersedia harus berupa angka",
    "number.integer": "Jumlah kursi tersedia harus berupa bilangan bulat",
    "number.min": "Jumlah kursi tersedia minimal 0",
  }),
})
  .min(1)
  .custom(scheduleTimeOrder);

const getSchedulesQuerySchema = Joi.object({
  dari: Joi.string().trim().min(2).max(5).uppercase().messages({
    "string.min": "Kode stasiun asal minimal 2 karakter",
    "string.max": "Kode stasiun asal maksimal 5 karakter",
  }),
  tujuan: Joi.string().trim().min(2).max(5).uppercase().messages({
    "string.min": "Kode stasiun tujuan minimal 2 karakter",
    "string.max": "Kode stasiun tujuan maksimal 5 karakter",
  }),
  tanggal: Joi.date().iso().messages({
    "date.base": "Tanggal harus berupa tanggal yang valid",
    "date.format": "Tanggal harus menggunakan format ISO",
  }),
});

const deleteScheduleParamsSchema = Joi.object({
  id: objectId.required().messages({
    "any.required": "Schedule ID wajib diisi",
  }),
});

module.exports = {
  createScheduleSchema,
  updateScheduleSchema,
  getSchedulesQuerySchema,
  deleteScheduleParamsSchema,
};
