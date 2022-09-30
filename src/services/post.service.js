const { BlogPost, User, Category, sequelize } = require('../models');

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

const updateById = async (id, title, content) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const updatedPost = await Promise.all(
        [
          BlogPost.update({ title }, { where: { id } }, { transaction: t }),
          BlogPost.update({ content }, { where: { id } }, { transaction: t }),
        ],
      );
      return updatedPost;
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (id) => {
  const deletedPost = await BlogPost.destroy({ where: { id } });
  return deletedPost;
};

module.exports = {
  getAllPosts,
  getPostById,
  updateById,
  deleteById,
};