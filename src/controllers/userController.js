const User = require("../models/User");

async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User tidak ditemukan." });
    return res.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Gagal mengambil profil." });
  }
}

async function updateAvatar(req, res) {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "File avatar tidak ditemukan." });

    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: avatarPath }, { new: true }).select("-password");
    return res.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Gagal mengupdate avatar." });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const removed = await User.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ success: false, message: "User tidak ditemukan." });
    return res.json({ success: true, message: "User dihapus.", data: { id: removed._id } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Gagal menghapus user." });
  }
}

module.exports = { getMe, updateAvatar, deleteUser };
