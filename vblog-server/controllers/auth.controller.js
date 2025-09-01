const User = require('../models/User');
const {
  generateToken,
  generateVerifyEmailToken,
  comparePassword,
  createCookieOptions,
} = require('../utils');
const { sendEmail } = require('../utils/email.utils');
const { OAuth2Client } = require('google-auth-library');

const register = async (req, res) => {
  try {
    const { name, email, password, bio, avatar, phone } = req.body;
    if (!name || !email || !password) {
      return res.error(400, 'Vui lòng nhập đầy đủ thông tin');
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.error(400, 'Email đã tồn tại');
    }
    const verifyTokenAuth = generateVerifyEmailToken();
    const verifyTokenAuthExpires = new Date(Date.now() + 3600000);
    const user = await User.create({
      name,
      email,
      password,
      bio,
      avatar,
      phone,
      authProvider: 'local',
      verifyToken: verifyTokenAuth,
      verifyTokenExpires: verifyTokenAuthExpires,
    });

    const verificationUrl = `${
      process.env.CLIENT_URL
    }/verify-email/${encodeURIComponent(user.email)}`;

    await sendEmail({
      to: user.email,
      subject: 'Xác thực Email',
      text: `
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 30px; text-align: center;">
            <h2 style="color:rgb(179, 93, 44); margin-bottom: 20px;">vBlog</h2>
            <h1 style="color: #2d3748; margin-bottom: 20px;">Xác thực Email của bạn</h1>
            <p style="font-size: 16px; margin-bottom: 25px;">Xin chào ${name},</p>
            <p style="font-size: 16px; margin-bottom: 25px;">Cảm ơn bạn đã đăng ký tài khoản. Vui lòng nhấp vào nút bên dưới để xác thực địa chỉ email của bạn:</p>
            <a href="${verificationUrl}" target="_blank" style="background-color: #4299e1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-bottom: 25px;">Xác thực Email</a>
            <p style="font-size: 14px; color: #718096; margin-bottom: 15px;">Hoặc bạn có thể sử dụng mã xác thực này:</p>
            <div style="background-color: #edf2f7; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
              <code style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${user.verificationToken}</code>
            </div>
            <p style="font-size: 14px; color: #718096;">Mã xác thực này sẽ hết hạn sau 1 giờ.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;">
            <p style="font-size: 12px; color: #718096;">Nếu bạn không yêu cầu email này, vui lòng bỏ qua nó.</p>
          </div>
        </body>       
      `,
    });
    res.success(201, 'Đăng ký thành công, vui lòng xác thực email', user);
  } catch (error) {
    console.log('ERROR register:', error);
    return res.error(500, 'Lỗi server nội bộ');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.error(400, 'Vui lòng nhập đầy đủ thông tin');
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.error(400, 'Email không tồn tại');
    }
    if (user.authProvider === 'google') {
      return res.error(400, 'Tài khoản này đã đăng ký bằng Google');
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.error(400, 'Mật khẩu không chính xác');
    }
    if (!user.isVerified) {
      return res.error(400, 'Email chưa được xác thực');
    }
    if (user.isBanned) {
      return res.error(400, 'Tài khoản này đã bị khóa');
    }
    const accessToken = generateToken(user._id, user.role);
    res.cookie('accessToken', accessToken, createCookieOptions);

    res.success(200, 'Đăng nhập thành công', { user, accessToken });
  } catch (error) {
    console.log('ERROR login:', error);
    return res.error(500, 'Lỗi server nội bộ');
  }
};

const googleLogin = async (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  try {
    const { token } = req.body;
    if (!token) {
      return res.error(400, 'Không có Google token');
    }
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (user) {
      if (user.authProvider === 'local') {
        return res.error(400, 'Email này đã được đăng ký bằng mật khẩu');
      }
      if (user.avatar !== picture) {
        user.avatar = picture;
        await user.save();
      }
    } else {
      user = await User.create({
        name,
        email,
        password: 'google_auth_' + googleId,
        phone: '',
        avatar: picture,
        bio: 'Đăng nhập bằng Google',
        authProvider: 'google',
        googleId,
      });
    }
    const accessToken = generateToken(user._id, user.role);
    res.success(200, 'Đăng nhập Google thành công', { user, accessToken });
  } catch (error) {
    console.log('ERROR Google auth:', error);
    return res.error(500, 'Lỗi xác thực Google');
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, verifyToken } = req.body;

    if (!verifyToken) {
      return res.error(400, 'Vui lòng cung cấp mã xác thực');
    }

    const user = await User.findOne({
      email,
      verifyToken: verifyToken,
      verifyTokenExpires: { $gt: new Date(Date.now()) },
    });

    if (!user) {
      return res.error(401, 'Mã xác thực không hợp lệ hoặc đã hết hạn');
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    const accessToken = generateToken(user._id, user.role);

    await user.save();

    res.success(200, 'Xác thực email thành công', {
      user,
      accessToken,
    });
  } catch (error) {
    return res.error(500, 'Lỗi server nội bộ');
  }
};

const resendVerifyToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.error(400, 'Vui lòng cung cấp email');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.error(400, 'Email không tồn tại');
    }

    if (user.isVerified) {
      return res.error(400, 'Email đã được xác thực');
    }

    // Generate verification token
    const verifyToken = generateVerifyEmailToken();
    user.verifyToken = verifyToken;
    user.verifyTokenExpires = new Date(Date.now() + 3600000);

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Xác thực Email',
      text: `
        <h1>Xác thực Email</h1>
        <p>Vui lòng nhấp vào liên kết bên dưới để xác thực tài khoản của bạn:</p>
        <a href="${verificationUrl}" target="_blank">Xác thực Email</a>
        <p>Hoặc nhập mã xác thực này:</p>
          <h2>${verifyToken}</h2>
      `,
    });

    res.success(200, 'Mã xác thực đã được gửi lại', {
      user,
    });
  } catch (error) {
    return res.error(500, 'Lỗi server nội bộ');
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.success(200, 'Lấy thông tin người dùng thành công', { user });
  } catch (error) {
    return res.error(500, 'Lỗi server nội bộ');
  }
};

const logout = async (req, res) => {
  res.clearCookie('accessToken');
  res.success(200, 'Đăng xuất thành công');
};

module.exports = {
  register,
  login,
  googleLogin,
  verifyEmail,
  resendVerifyToken,
  me,
  logout,
};
