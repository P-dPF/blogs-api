const { User } = require('../models');

const loginHandler = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user.dataValues;
};

const createUSer = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  return newUser.dataValues;
};

module.exports = {
  loginHandler,
  createUSer,
};