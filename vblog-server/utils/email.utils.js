const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmail,
};
