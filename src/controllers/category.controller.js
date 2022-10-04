const { CategoryService } = require('../services');
const validateSchema = require('../validations/validateInputs');
const { addCategorySchema } = require('../validations/schemas');

const getAllCategories = async (req, res) => {
  const categories = await CategoryService.getAllCategories();
  res.status(200).json(categories);
};

const createCategory = async (req, res, next) => {
  const newCategory = req.body;

  const isCategoryInvalid = validateSchema(addCategorySchema, newCategory);
  if (isCategoryInvalid) return next({ status: 400, message: isCategoryInvalid.message });

  const createdCategory = await CategoryService.createCategory(newCategory);
  res.status(201).json(createdCategory);
};

module.exports = {
  createCategory,
  getAllCategories,
};
