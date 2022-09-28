const { addUserSchema, addCategorySchema } = require('./schemas');

const validateNewUser = (displayName, email, password, image) => {
  const { error } = addUserSchema.validate({ displayName, email, password, image });
  
  return error || null;
};

const validateNewCategory = (name) => {
  const { error } = addCategorySchema.validate({ name });
  
  return error || null;
};

module.exports = {
  validateNewUser,
  validateNewCategory,
};