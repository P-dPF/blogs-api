const { User } = require('../models');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) return user.dataValues;
  return null;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (user) return user.dataValues;
  return null;
};

const create = async (newUser) => {
  const createdUser = await User.create(newUser);
  return createdUser.dataValues;
};

const deleteById = async (id) => {
  const deletedUser = await User.destroy({ where: { id } });
  return deletedUser;
};

module.exports = {
  getUserByEmail,
  create,
  getById,
  getAll,
  deleteById,
};