const express = require('express');
const router = express.Router();
const { register, login, getMe, updateAvatar, deleteUser } = require('../controllers/authController');
const { registerRules, loginRules, handleValidation } = require('../validators/authValidator');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const upload = require('../middlewares/upload');

router.post('/register', registerRules, handleValidation, register);
router.post('/login', loginRules, handleValidation, login);
router.get('/me', auth, getMe);
router.put('/avatar', auth, upload.single('avatar'), updateAvatar);
router.delete('/:id', auth, role, deleteUser);

module.exports = router;
