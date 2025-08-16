const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    author: {
      name: {
        type: String,
        maxlength: [50, 'Name must be at most 50 characters'],
        default: 'Anonymous',
      },
      avatar: {
        type: String,
        default: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Luis',
      },
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Comment must be at least 3 characters'],
      maxlength: [500, 'Comment must be at most 500 characters'],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ parent: 1 });

module.exports = mongoose.model('Comment', commentSchema);
