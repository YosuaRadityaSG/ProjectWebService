const Station = require("../models/Station");

// GET /api/stations
// Bisa query optional: ?city=Jakarta untuk filter berdasarkan kota
async function getAllStations(req, res, next) {
  try {
    const filter = {};
    if (req.query.city) {
      // ini gunane buat kek ngeauto fill contoh kamu nulis jak -> di jadiin Jakarta sugestion nya kurang lebih
      filter.city = { $regex: req.query.city, $options: "i" };
    }

    const stations = await Station.find(filter).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "Daftar stasiun berhasil diambil",
      count: stations.length,
      data: stations,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/stations/:id
async function getStationById(req, res, next) {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Stasiun tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Detail stasiun berhasil diambil",
      data: station,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/stations
async function createStation(req, res, next) {
  try {
    const station = await Station.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Stasiun berhasil ditambahkan",
      data: station,
    });
  } catch (err) {
    next(err);
  }
}

// PUT /api/stations/:id
async function updateStation(req, res, next) {
  try {
    const station = await Station.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // return data terbaru & jalankan schema validation
    );

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Stasiun tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stasiun berhasil diperbarui",
      data: station,
    });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/stations/:id
async function deleteStation(req, res, next) {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Stasiun tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stasiun berhasil dihapus",
      data: station,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
};
