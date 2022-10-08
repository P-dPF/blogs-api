const { CategoryService } = require('../services');
const validateSchema = require('../validations/validateInputs');
const { addCategorySchema } = require('../validations/schemas');

const getAll = async (req, res) => {
  const categories = await CategoryService.getAll();
  res.status(200).json(categories);
};

const create = async (req, res, next) => {
  const newCategory = req.body;

  const isCategoryInvalid = validateSchema(addCategorySchema, newCategory);
  if (isCategoryInvalid) return next({ status: 400, message: isCategoryInvalid.message });

  const createdCategory = await CategoryService.create(newCategory);
  res.status(201).json(createdCategory);
};

module.exports = {
  create,
  getAll,
};
