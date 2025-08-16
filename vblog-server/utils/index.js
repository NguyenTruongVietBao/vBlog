const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Verify token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Create cookie
const createCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  });
};

// Delete cookie
const deleteCookie = (res) => {
  res.clearCookie('token');
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  createCookie,
  deleteCookie,
};
