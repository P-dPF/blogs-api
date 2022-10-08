const { PostService } = require('../services');

const getAll = async (req, res) => {
  const posts = await PostService.getAll();
  res.status(200).json(posts);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const post = await PostService.getById(id);
  if (!post) return next({ status: 404, message: 'Post does not exist' });

  res.status(200).json(post);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) return next({ status: 400, message: 'Some required fields are missing' });
  const post = await PostService.getById(id);
  if (post.userId !== req.user.id) return next({ status: 401, message: 'Unauthorized user' });

  await PostService.update(id, title, content);

  const updatedPost = await PostService.getById(id);

  res.status(200).json(updatedPost);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await PostService.getById(id);
    if (!post) return next({ status: 404, message: 'Post does not exist' });
    if (post.userId !== req.user.id) return next({ status: 401, message: 'Unauthorized user' });
  
    await PostService.deleteById(id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
  }
};

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;

  if (!title || !content || !categoryIds.length) {
    return next({ status: 400, message: 'Some required fields are missing' });
  }
  if (!categoryIds) return next({ status: 400, message: '"categoryIds" not found' });

  const newPost = await PostService.create(title, content, categoryIds, user.id);

  res.status(201).json(newPost);
};

const searchByQueryTerm = async (req, res) => {
  const { q } = req.query;

  const searchedPosts = await PostService.searchByQueryTerm(q);

  res.status(200).json(searchedPosts);
};

module.exports = {
  getAll,
  getById,
  update,
  deleteById,
  create,
  searchByQueryTerm,
};
