const { PostService } = require('../services');

const getAllPosts = async (req, res) => {
  const posts = await PostService.getAllPosts();
  res.status(200).json(posts);
};

module.exports = {
  getAllPosts,
};
