const UserService = require('../services/user.service');

const createUSer = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await UserService.createUSer(displayName, email, password, image);
  console.log(newUser);
  res.status(201).json({ token: 'token' });
};

module.exports = {
  createUSer,
};