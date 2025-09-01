const User = require('../models/User');
const { verifyToken } = require('../utils');

const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return res.error(401, 'Không có token, truy cập bị từ chối');
    }

    const decoded = verifyToken(accessToken);
    if (!decoded) {
      return res.error(401, 'Token không hợp lệ');
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.error(404, 'Không tìm thấy người dùng');
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('ERROR protectRoute:', error);
    return res.error(500, 'Lỗi server nội bộ');
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.error(403, 'Bạn không có quyền truy cập đường dẫn này');
    }
    next();
  };
};

module.exports = { protectRoute, authorizeRole };
