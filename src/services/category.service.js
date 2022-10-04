const { Category } = require('../models');

const getAllCategories = async () => {
  const categories = await Category.findAll({ attributes: { exclude: ['password'] } });

  return categories;
};

const createCategory = async (newCategory) => {
  const createdCategory = await Category.create(newCategory);
  return createdCategory.dataValues;
};

module.exports = {
  createCategory,
  getAllCategories,
};
