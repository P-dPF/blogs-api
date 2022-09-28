const { addUserSchema } = require('./schemas');

const validateNewUser = (displayName, email, password, image) => {
  const { error } = addUserSchema.validate({ displayName, email, password, image });
  
  return error || null;
};

module.exports = {
  validateNewUser,
};