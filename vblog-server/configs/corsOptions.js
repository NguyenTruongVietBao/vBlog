const WHITELIST_DOMAIN = ['http://localhost:3000', 'http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (WHITELIST_DOMAIN.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

module.exports = { corsOptions };
