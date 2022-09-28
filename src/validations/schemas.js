const Joi = require('joi');

const addUserSchema = Joi.object().keys({
  displayName: Joi.string().min(8),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  image: Joi.string().optional(),
});

const addCategorySchema = Joi.object().keys({
  name: Joi.string().required(),
});

module.exports = {
  addUserSchema,
  addCategorySchema,
};