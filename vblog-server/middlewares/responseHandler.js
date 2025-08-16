// middlewares/responseHandler.js
module.exports = (req, res, next) => {
  res.success = (
    statusCode = 200,
    message = 'Fetch API Success',
    data = null
  ) => {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  };

  res.error = (statusCode = 500, message = 'Fetch API Error', data = null) => {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      data,
    });
  };

  next();
};
