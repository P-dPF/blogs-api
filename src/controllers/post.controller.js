const { PostService } = require('../services');

const getAllPosts = async (req, res) => {
  const posts = await PostService.getAllPosts();
  res.status(200).json(posts);
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;

  const post = await PostService.getPostById(id);
  if (!post) return next({ status: 404, message: 'Post does not exist' });

  res.status(200).json(post);
};

module.exports = {
  getAllPosts,
  getPostById,
};
