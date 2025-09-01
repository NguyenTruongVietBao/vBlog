const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Access token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: '1d',
  });
};
const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
};
const decodeToken = (token) => {
  return jwt.decode(token, process.env.ACCESS_TOKEN_KEY);
};

// Auth token
const generateVerifyEmailToken = () => {
  return crypto.randomInt(100000, 999999).toString();
};
const generateResetPasswordToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Cookie
const createCookieOptions = {
  httpOnly: true, // ngăn JavaScript truy cập.
  secure: process.env.NODE_ENV === 'production', // đảm bảo cookie chỉ gửi qua HTTPS.
  sameSite: 'strict', //để ngăn cookie gửi trong các yêu cầu cross-site
  maxAge: 1000 * 60 * 60 * 24, // 1 day
};
const deleteCookie = (res) => {
  res.clearCookie('accessToken');
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  createCookieOptions,
  deleteCookie,
  decodeToken,
  generateVerifyEmailToken,
  generateResetPasswordToken,
};
