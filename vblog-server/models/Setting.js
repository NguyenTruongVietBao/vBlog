const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      default: 'My Post',
    },

    siteDescription: {
      type: String,
      default: 'Chia sẻ những bài viết thú vị',
    },

    siteUrl: {
      type: String,
      default: 'http://localhost:3000',
    },

    contactEmail: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ'],
    },

    socialLinks: {
      facebook: String,
      twitter: String,
      instagram: String,
      youtube: String,
    },

    commentSettings: {
      requireApproval: {
        type: Boolean,
        default: true,
      },
      allowGuests: {
        type: Boolean,
        default: true,
      },
      maxCommentLength: {
        type: Number,
        default: 500,
      },
    },
    seoSettings: {
      defaultMetaTitle: String,
      defaultMetaDescription: String,
      googleAnalyticsId: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Setting', settingSchema);
