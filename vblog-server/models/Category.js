const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: [50, 'Category name must be at most 50 characters'],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Lấy số lượng bài viết của mỗi danh mục
categorySchema.virtual('totalPosts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'category',
  count: true,
});

// Tự động tạo slug từ name
categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    const noAccent = this.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    this.slug = noAccent
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);
