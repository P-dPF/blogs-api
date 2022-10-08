const { Category } = require('../models');

const getAll = async () => {
  const categories = await Category.findAll({ attributes: { exclude: ['password'] } });

  return categories;
};

const create = async (newCategory) => {
  const createdCategory = await Category.create(newCategory);
  return createdCategory.dataValues;
};

module.exports = {
  create,
  getAll,
};
