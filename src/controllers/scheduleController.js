const Schedule = require("../models/Schedule");

const createSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.create(req.body);
    return res
      .status(201)
      .json({ success: true, message: "Schedule created", data: schedule });
  } catch (err) {
    next(err);
  }
};

const getSchedules = async (req, res, next) => {
  try {
    const { dari, tujuan, tanggal } = req.query;

    const match = {};
    if (tanggal) match.tanggal = tanggal;

    if (dari) {
      const dep = await Station.findOne({ code: dari.toUpperCase() });
      if (!dep) {
        return res.status(404).json({
          success: false,
          message: `Stasiun asal dengan kode '${from}' tidak ditemukan.`,
        });
      }
      match.departureStation = dep._id;
    }

    if (tujuan) {
      const arr = await Station.findOne({ code: tujuan.toUpperCase() });
      if (!arr) {
        return res.status(404).json({
          success: false,
          message: `Stasiun tujuan dengan kode '${tujuan}' tidak ditemukan.`,
        });
      }
      match.arrivalStation = arr._id;
    }

    // 3. Menggunakan Query Mongoose Biasa + Populate (Lebih bersih & cepat dibanding Aggregation untuk kasus ini)
    const schedules = await Schedule.find(match)
      .populate("train")
      .populate("departureStation")
      .populate("arrivalStation");

    return res.json({
      success: true,
      message: "Schedules fetched",
      data: schedules,
    });
  } catch (err) {
    next(err);
  }
};

const updateSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!schedule) {
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found" });
    }
    return res.json({
      success: true,
      message: "Schedule updated",
      data: schedule,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found" });
    }
    return res.json({ success: true, message: "Schedule deleted", data: null });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
};
