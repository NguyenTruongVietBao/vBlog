const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../utils');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password at least 6 characters'],
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 500,
      default: 'no bio yet',
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    authProvider: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      default: 'local',
    },
    googleId: {
      type: String,
      sparse: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
    },
    verifyTokenExpires: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (this.authProvider === 'local' && this.password) {
    this.password = await hashPassword(this.password);
  }
  if (!this.avatar) {
    this.avatar =
      'https://api.dicebear.com/9.x/fun-emoji/svg?seed=' +
      this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
