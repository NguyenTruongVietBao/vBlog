var express = require('express');
var router = express.Router();
const {
  register,
  login,
  googleLogin,
  verifyEmail,
  resendVerifyToken,
  me,
  logout,
} = require('../controllers/auth.controller');
const { protectRoute } = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protectRoute, logout);
router.post('/google-login', googleLogin);
router.post('/verify-email', verifyEmail);
router.post('/resend-verify-token', resendVerifyToken);
router.get('/me', protectRoute, me);

module.exports = router;
