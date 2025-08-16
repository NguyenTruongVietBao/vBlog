const mongoose = require('mongoose');
const { hashPassword } = require('../utils');
const { comparePassword } = require('../utils');

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
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Luis',
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await comparePassword(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
