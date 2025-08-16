const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [200, 'Title must be at most 200 characters long'],
    },
    content: {
      type: String,
      required: true,
      minlength: [50, 'Content must be at least 50 characters long'],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      maxlength: [300, 'Summary must be at most 300 characters long'],
      default: function () {
        return this.content ? this.content.substring(0, 150) + '...' : '';
      },
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
      default: 'DRAFT',
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual('commentCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  count: true,
});

postSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const code = bcrypt.hashSync(this.slug, 10);
    if (!this.isNew) {
      this.slug += '.' + code;
    }
  }

  if (
    this.isModified('status') &&
    this.status === 'PUBLISHED' &&
    !this.publishedAt
  ) {
    this.publishedAt = new Date();
  }

  next();
});

postSchema.index({ title: 'text', content: 'text', tags: 'text' });
postSchema.index({ status: 1, publishedAt: -1 });

module.exports = mongoose.model('Post', postSchema);
