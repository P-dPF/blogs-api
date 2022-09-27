const { User } = require('../models');

const loginHandler = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user.dataValues;
};

module.exports = {
  loginHandler,
};