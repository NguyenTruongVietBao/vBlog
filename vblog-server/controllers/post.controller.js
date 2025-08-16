const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.success(200, 'Posts fetched successfully', posts);
  } catch (error) {
    res.error(500, 'Internal Server Error', error.message);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.success(200, 'Post fetched successfully', post);
  } catch (error) {
    res.error(500, 'Internal Server Error', error.message);
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.success(201, 'Post created successfully', post);
  } catch (error) {
    res.error(500, 'Internal Server Error', error.message);
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.error(404, 'Post not found');
    }
    post.title = req.body.title;
    post.content = req.body.content;
    post.category = req.body.category;
    post.tags = req.body.tags;
    post.image = req.body.image;
    post.summary = req.body.summary;
    post.status = req.body.status;
    await post.save();
    res.success(200, 'Post updated successfully', post);
  } catch (error) {
    res.error(500, 'Internal Server Error', error.message);
  }
};
exports.getPostByCategoryId = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.find({ category: id });
    res.success(200, 'Post fetched successfully', post);
  } catch (error) {
    res.error(500, 'Internal Server Error', error.message);
  }
};
