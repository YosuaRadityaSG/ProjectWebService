const Train = require("../models/Train");

// GET /api/trains
// Bisa query optional: ?class=Eksekutif untuk filter berdasarkan kelas
async function getAllTrains(req, res, next) {
  try {
    const filter = {};
    if (req.query.class) {
      filter.class = req.query.class;
    }

    const trains = await Train.find(filter).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "Daftar kereta berhasil diambil",
      count: trains.length,
      data: trains,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/trains/:id
async function getTrainById(req, res, next) {
  try {
    const train = await Train.findById(req.params.id);

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Kereta tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Detail kereta berhasil diambil",
      data: train,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/trains
async function createTrain(req, res, next) {
  try {
    const train = await Train.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Kereta berhasil ditambahkan",
      data: train,
    });
  } catch (err) {
    next(err);
  }
}

// PUT /api/trains/:id
async function updateTrain(req, res, next) {
  try {
    const train = await Train.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Kereta tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Kereta berhasil diperbarui",
      data: train,
    });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/trains/:id
async function deleteTrain(req, res, next) {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Kereta tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Kereta berhasil dihapus",
      data: train,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTrains,
  getTrainById,
  createTrain,
  updateTrain,
  deleteTrain,
};
