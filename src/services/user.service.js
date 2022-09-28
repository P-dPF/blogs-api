const { User } = require('../models');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) return user.dataValues;
};

const createUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  return newUser.dataValues;
};

module.exports = {
  getUserByEmail,
  createUser,
};