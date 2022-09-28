const { Category } = require('../models');

const getAllCategories = async () => {
  const categories = await Category.findAll({ attributes: { exclude: ['password'] } });

  return categories;
};

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory.dataValues;
};

module.exports = {
  createCategory,
  getAllCategories,
};
