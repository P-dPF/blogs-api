const { BlogPost, User, Category } = require('../models');

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
  });

  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
  });

  return post;
};

module.exports = {
  getAllPosts,
  getPostById,
};