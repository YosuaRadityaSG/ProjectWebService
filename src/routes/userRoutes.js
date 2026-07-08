const express = require("express");
const router = express.Router();
const { getMe, updateAvatar, deleteUser } = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/auth");
const { uploadAvatar } = require("../middlewares/upload");

router.get("/me", authenticate, getMe);
router.put("/avatar", authenticate, uploadAvatar.single("avatar"), updateAvatar);
router.delete("/:id", authenticate, authorize("admin"), deleteUser);

module.exports = router;
