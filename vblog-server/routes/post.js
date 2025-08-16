var express = require('express');
var router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  getPostByCategoryId,
  updatePost,
  deletePost,
} = require('../controllers/post.controller');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.get('/category/:id', getPostByCategoryId);
router.post('/', createPost);

module.exports = router;
