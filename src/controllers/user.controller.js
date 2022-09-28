const UserService = require('../services/user.service');
const { validateNewUser } = require('../validations/validateInputs');
const { generateToken } = require('../middlewares');

const getAllUsers = async (req, res) => {
  const users = await UserService.getAllUsers();
  res.status(200).json(users);
};

const createUSer = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const isUserInvalid = validateNewUser(displayName, email, password, image);
  if (isUserInvalid) return next({ status: 400, message: isUserInvalid.message });

  const doesUserExist = await UserService.getUserByEmail(email);
  if (doesUserExist) return next({ status: 409, message: 'User already registered' });

  const newUser = await UserService.createUser(displayName, email, password, image);
  const token = generateToken(newUser);
  res.status(201).json({ token });
};

module.exports = {
  createUSer,
  getAllUsers,
};