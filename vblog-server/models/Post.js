const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    subtitle: {
      type: String,
      maxlength: 200,
      default: '',
    },
    // Lưu cả JSON (TipTap) và HTML để SEO + hiển thị nhanh
    content_json: {
      type: Object,
      default: {
        type: '',
        content: [],
      },
      required: true,
    },
    content_html: {
      type: String,
      default: '',
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    summary: {
      type: String,
      maxlength: 300,
      default: '',
    },
    images: [
      {
        url: String,
        alt: String,
        caption: String,
      },
    ],
    attachments: [
      {
        name: String,
        url: String,
        size: Number,
        type: String,
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    readingTime: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['PRIVATE', 'PUBLIC', 'ARCHIVED'],
      default: 'PRIVATE',
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

// Virtual: count comments
postSchema.virtual('commentCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  count: true,
});

// Slug + summary + readingTime + publishedAt
postSchema.pre('save', async function (next) {
  // Slug
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Summary: lấy từ content_html
  if (this.isModified('content_html')) {
    const plainText = this.content_html.replace(/<[^>]+>/g, ''); // bỏ tag HTML
    this.summary = plainText.substring(0, 150) + '...';

    // Reading time (150 từ / phút)
    const wordCount = plainText.split(/\s+/).length;
    this.readingTime = Math.max(1, Math.ceil(wordCount / 150));
  }

  // PublishedAt
  if (
    this.isModified('status') &&
    this.status === 'PUBLIC' &&
    !this.publishedAt
  ) {
    this.publishedAt = new Date();
  }

  // Kiểm tra slug trùng
  if (
    !this.isNew &&
    (await this.constructor.findOne({
      slug: this.slug,
      _id: { $ne: this._id },
    }))
  ) {
    this.slug += '-' + Date.now();
  }

  next();
});

// Indexes
postSchema.index({ title: 'text', content_html: 'text', summary: 'text' });
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ category: 1, status: 1 });
postSchema.index({ tags: 1, status: 1 });
postSchema.index({ status: 1, publishedAt: -1 });

module.exports = mongoose.model('Post', postSchema);
