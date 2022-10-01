const { Op } = require('sequelize');
const { BlogPost, User, Category, sequelize, PostCategory } = require('../models');

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

const createPost = async (title, content, categoryIds, userId) => {
  const result = await sequelize.transaction(async (t) => {
    const allCategories = await Category.findAll({ where: { id: { [Op.or]: categoryIds } } });
    if (allCategories.length !== categoryIds.length) {
      const err = new Error('"categoryIds" not found');
      err.status = 400;
      throw err;
    }

    const newPost = await BlogPost.create({
      title, content, userId, published: new Date(), updated: new Date(),
    }, { transaction: t });

    const postCategoryList = categoryIds.map((categoryId) => (
      { postId: newPost.dataValues.id, categoryId }
      ));

    await PostCategory.bulkCreate(postCategoryList, { transaction: t });

    return newPost;
  });
  return result;
};

module.exports = {
  getAllPosts,
  getPostById,
  updateById,
  deleteById,
  createPost,
};
