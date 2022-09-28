const { CategoryService } = require('../services');
const { validateNewCategory } = require('../validations/validateInputs');

const getAllCategories = async (req, res) => {
  const categories = await CategoryService.getAllCategories();
  res.status(200).json(categories);
};

const createCategory = async (req, res, next) => {
  const { name } = req.body;

  const isCategoryInvalid = validateNewCategory(name);
  if (isCategoryInvalid) return next({ status: 400, message: isCategoryInvalid.message });

  const newCategory = await CategoryService.createCategory(name);
  res.status(201).json(newCategory);
};

module.exports = {
  createCategory,
  getAllCategories,
};
